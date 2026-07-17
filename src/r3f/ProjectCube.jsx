import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei';

const ProjectCube = () => {
  const meshRef = useRef();

  const texture = useTexture("/image.jpg")

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.z += 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3, 10, 10, 10]} />
      <meshBasicMaterial
       color='orange'
       map={texture}
    //    wireframe={true}
        />
      {/* <OrbitControls /> */}
    </mesh>
  )
}

export default ProjectCube