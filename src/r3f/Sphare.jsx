import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const textures = [
    "/TechStack/next-js.jpg",
    "/TechStack/gsap-white.png",
    "/TechStack/tailwind.jpg",
    "/TechStack/three-js.jpg",
    "/TechStack/webgl.jpg",
    "/TechStack/typescript.jpg",
    "/TechStack/git.jpg",
  ];

const count = textures.length;
const radius = 10;
const speed = 0.2;

function Sphare() {
  // Load all textures at once
  const loadedTextures = useTexture(textures);

  // Fix texture settings once
  useMemo(() => {
    loadedTextures.forEach((tex) => {
      if (!tex) return;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [loadedTextures]);

  const meshRefs = useRef([]);

  // Prepare an array of indices to map over
  const planes = useMemo(() => Array.from({ length: count }, (_, i) => i), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const angle = (i / count) * Math.PI * 2 + time * speed;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.lookAt(0, 0, 0);
    });
  });

  return (
    <>
      {planes.map((i) => (
        <mesh key={i} ref={(el) => (meshRefs.current[i] = el)}>
          <planeGeometry args={[6.5, 4, 10, 10]} />
          <meshBasicMaterial
            map={loadedTextures[i] ?? null}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

export default Sphare;
