import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

const MOBILE_WIDTH = 768; // px

const ProjectCube = () => {
  const meshRef = useRef();
  const [cubeArgs, setCubeArgs] = useState([4.5, 3, 4.5]); // [width, height, depth]

  // Responsive effect
  useEffect(() => {
    function updateCubeSize() {
      if (window.innerWidth <= MOBILE_WIDTH) {
        setCubeArgs([2.5, 1.6, 2.5]); // smaller cube for mobile
      } else {
        setCubeArgs([4.5, 3, 4.5]);
      }
    }
    updateCubeSize();
    window.addEventListener('resize', updateCubeSize);
    return () => {
      window.removeEventListener('resize', updateCubeSize);
    };
  }, []);

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
      <boxGeometry args={cubeArgs} />
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