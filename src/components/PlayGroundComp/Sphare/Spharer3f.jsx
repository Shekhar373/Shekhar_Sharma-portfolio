import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const images = [
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    "https://images.unsplash.com/photo-1511497584788-876760111969",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1473445361085-b9a07f55608b",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1473445361085-b9a07f55608b",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  ];

const radius = 6;

function fibonacciPosition(i, total, radius) {
  const y = 1 - (2 * (i + 0.5)) / total;

  const r = Math.sqrt(1 - y * y);

  const theta = i * Math.PI * (3 - Math.sqrt(5));

  const x = r * Math.cos(theta) * radius;
  const z = r * Math.sin(theta) * radius;

  return [x, y * radius, z];
}

function ImageCard({ src, position }) {
  const texture = new THREE.TextureLoader().load(src);

  return (
    <mesh position={position}>
      <planeGeometry args={[1.2, 1.6]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Spharer3f() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Slow rotation on Y axis
    group.current.rotation.y += delta * 0.1;

    // Make each child (image card) always face the camera
    const cameraPosition = state.camera.position;
    group.current.children.forEach((child) => {
      child.lookAt(cameraPosition);
    });
  });

  return (
    <group ref={group}>
      {images.map((src, i) => {
        const position = fibonacciPosition(
          i,
          images.length,
          radius
        );

        return (
          <ImageCard
            key={i}
            src={src}
            position={position}
          />
        );
      })}
    </group>
  );
}