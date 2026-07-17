import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import * as THREE from "three";


const WorkFlag = () => {
  const materialRef = useRef();
  const meshRef = useRef()

  const { camera, size } = useThree();
  camera.position.z = 4.2

  // Set initial rotation using useEffect, to ensure meshRef.current is defined
  React.useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 12;
    }
  }, []);

  let mouseX = useRef(0);
  let mouseY = useRef(0);

  useMemo(() => {
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / size.width) * 2 - 1;
      mouseY.current = (e.clientY / size.height) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  // Animate the uniform uTime on the shader material
  useFrame(() => {
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.uTime.value += 0.05;

      camera.position.x += (mouseX.current * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY.current * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 3, 100, 100]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            uTime: { value: 0 },
            uTexture: { value: new THREE.TextureLoader().load("/image.jpg") },
          }}
          // wireframe={true}
        />
      </mesh>
    </>
  );
};

export default WorkFlag;
