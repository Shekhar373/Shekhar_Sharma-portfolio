import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Starfield = () => {
  const starsRef = useRef();
  gsap.registerPlugin(ScrollTrigger)
  const { camera, size } = useThree();
  camera.position.z = 15;


  // const particletexture = useTexture("/star.jpg")

  // ⭐ Generate positions once
  const positions = useMemo(() => {
    const starCount = 3000;
    const arr = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Generate random point within a filled sphere using spherical coordinates and radius randomization
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 5 * Math.cbrt(Math.random()); // Cube root ensures uniform volumetric distribution

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    return arr;
  }, []);

  let mouseX = useRef(0);
  let mouseY = useRef(0);

  // const hero = document.getElementById("hero");

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
      starsRef.current.rotation.y += 0.0005;
    }

    camera.position.x += (mouseX.current * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY.current * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  useGSAP(() => {
    gsap.to(camera.position, {
      z: "-=11",
      duration: 4,
      // delay: 2,
      ease: "power1.out",
      scrollTrigger:{
        trigger:".hero",
        start:"top top",
        end:"bottom top",
        pin:true,
        // markers:true,
        scrub:1
      }
    });
  }, [camera]);

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
        // map={particletexture}
        size={0.01}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
      {/* <OrbitControls /> */}
    </points>
  );
};

export default Starfield;
