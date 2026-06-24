import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Starfield = ()=> {
  const starsRef = useRef();
  const { camera, size } = useThree();
  camera.position.z = 4

  // ⭐ Generate positions once
  const positions = useMemo(() => {
    const starCount = 2000;
    const arr = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }

    return arr;
  }, []);

  let mouseX = useRef(0);
  let mouseY = useRef(0);

  // 🎯 Mouse move
  useMemo(() => {
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / size.width) * 2 - 1;
      mouseY.current = (e.clientY / size.height) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  // 🎥 Animation loop
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0003;
    }

    camera.position.x += (mouseX.current * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY.current * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default Starfield