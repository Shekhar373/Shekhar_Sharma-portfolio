import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const positions = [
  [-5, 2, 0], // top left
  [-5, -1, 0], // bottom left
  [0, 4, 0], // top center
  [5, 1, 0], // right top
  [4, -2, 0], // right bottom
  [0, -4, 0], // bottom center
];

const ImageSphare = () => {
  const group = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const speed = 0.2;
    const radius = 4;
    const angleStep = (2 * Math.PI) / positions.length;

    group.current.children.forEach((plane, i) => {
      const angle = speed * t + i * angleStep;
      plane.position.x = Math.cos(angle) * radius;
      plane.position.y = Math.sin(angle) * radius;
      plane.position.z = positions[i][2]; // Keep original z

      // Make sure planes do NOT face the center; keep their rotation constant (or control as desired)
      plane.rotation.z = 0; // No spinning to face center
    });
  });

  return (
    <group ref={group}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <planeGeometry args={[1.5, 2]} />
          {/* <meshBasicMaterial map={textures[i]} /> */}
        </mesh>
      ))}
    </group>
  );
};

export default ImageSphare;
