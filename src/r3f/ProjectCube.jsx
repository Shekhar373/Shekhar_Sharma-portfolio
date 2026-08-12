import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

const ProjectCube = () => {
  const meshRef = useRef();

  // Load six unique images for each face; fallback to repeating like original if you only have two
  const textures = useTexture([
    "/projects/echo-studio/cover-image.png",         // right
    "/projects/echo-studio/cover-image.png",    // left
    "/projects/newhew-studio/new-cover.webp",        // top
    "/cube-image.jpg",    // bottom
   "/projects/newhew-studio/new-cover.webp",         // front
   "/projects/newhew-studio/new-cover.webp",     // back
  ]);

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.008;
      // Remove z rotation for more typical cube spin, or keep if intentional.
      // meshRef.current.rotation.z += 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4.5, 3, 4.5]} />
      {/* Each face gets its own material. */}
      {textures.map((texture, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
        />
      ))}
    </mesh>
  )
}

export default ProjectCube