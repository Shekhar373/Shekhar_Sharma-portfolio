import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function GridBackground() {
  const meshRef = useRef(null);

  // Mouse target
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uGridScale: { value: 28 },
      uLineWidth: { value: 0.5 },
      uMouseRadius: { value: 0.22 },
      uMouseStrength: { value: 0.9 },
      uEdgeWidth: { value: 0.14 },
      uEdgeStrength: { value: 1.35 },
      uScrollSpeed: { value: 0.01 },
    }),
    []
  );

  // Smooth mouse movement for the shader
  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMouse.value.lerp(mouseTarget.current, 0.08);
  });

  // Track mouse in window and update shader mouse target
  const handleMouseMove = (event) => {
    const x = event.clientX / window.innerWidth;
    const y = 1 - event.clientY / window.innerHeight;
    mouseTarget.current.set(x, y);
  };

  return (
    <>
      {/* Mouse listener */}
      <MouseTracker onMove={handleMouseMove} />

      <mesh ref={meshRef} position={[0, 0, -5]}>
        {/* High subdivision for smooth deformation */}
        <planeGeometry args={[28, 18, 256, 256]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;

            uniform vec2 uMouse;
            uniform float uMouseRadius;
            uniform float uMouseStrength;
            uniform float uEdgeWidth;
            uniform float uEdgeStrength;

            void main() {
              vUv = uv;
              vec3 pos = position;

              // Mouse distortion
              float mouseDistance = distance(vUv, uMouse);
              float mouseInfluence = 1.0 - smoothstep(0.0, uMouseRadius, mouseDistance);

              // Edge distortion
              float edgeDistance = min(
                min(vUv.x, 1.0 - vUv.x),
                min(vUv.y, 1.0 - vUv.y)
              );
              float edgeInfluence = 1.0 - smoothstep(0.0, uEdgeWidth, edgeDistance);

              // Final deformation
              float mouseOffset = mouseInfluence * uMouseStrength;
              float edgeOffset = edgeInfluence * uEdgeStrength;
              pos.z += mouseOffset + edgeOffset;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform float uGridScale;
            uniform float uLineWidth;
            uniform float uScrollSpeed;

            // Creates a single anti-aliased grid line.
            float gridLine(float coord, float width) {
              float fw = fwidth(coord);
              float p = abs(fract(coord - 0.5) - 0.5);
              return 1.0 - smoothstep(width * fw, (width + 1.0) * fw, p);
            }

            void main() {
              // Move the grid horizontally over time.
              vec2 uv = (vUv + vec2(uTime * uScrollSpeed, 0.0)) * uGridScale;

              // Vertical and horizontal grid lines
              float vertical = gridLine(uv.x, uLineWidth);
              float horizontal = gridLine(uv.y, uLineWidth);

              float grid = max(vertical, horizontal);

              vec3 background = vec3(0.0);
              vec3 line = vec3(0.1);
              vec3 color = mix(background, line, grid);

              gl_FragColor = vec4(color, 1.0);
            }
          `}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

/*
 * --------------------------------------------------
 * MOUSE TRACKER
 * --------------------------------------------------
 *
 * Keeps the shader component independent from
 * normal DOM event handling.
 */

function MouseTracker({ onMove }) {
  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [onMove]);

  return null;
}
