import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

/* -----------------------------
Utils
----------------------------- */

const lerp = (a, b, t) => a + (b - a) * t;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/* -----------------------------
Shaders
----------------------------- */

const vertexShader = `
precision highp float;

uniform float uPosition;
uniform float uDistortion;

uniform vec3 distortionAxis;
uniform vec3 rotationAxis;

varying vec2 vUv;

float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {

axis = normalize(axis);

float s = sin(angle);
float c = cos(angle);
float oc = 1.0 - c;

return mat4(
    oc * axis.x * axis.x + c,
    oc * axis.x * axis.y - axis.z * s,
    oc * axis.z * axis.x + axis.y * s,
    0.0,

    oc * axis.x * axis.y + axis.z * s,
    oc * axis.y * axis.y + c,
    oc * axis.y * axis.z - axis.x * s,
    0.0,

    oc * axis.z * axis.x - axis.y * s,
    oc * axis.y * axis.z + axis.x * s,
    oc * axis.z * axis.z + c,
    0.0,

    0.0,
    0.0,
    0.0,
    1.0
);


}

vec3 rotate(
vec3 v,
vec3 axis,
float angle
) {

mat4 m =
    rotationMatrix(axis, angle);

return (m * vec4(v, 1.0)).xyz;


}

float qinticInOut(float t) {

return t < 0.5
    ? 16.0 * pow(t, 5.0)
    : -0.5 *
      abs(pow(2.0 * t - 2.0, 5.0))
      + 1.0;


}

void main() {

vUv = uv;

float norm = 0.5;

vec3 newpos = position;

/*
 * Determines how much each
 * vertex is distorted.
 */

float offset =
    (
        dot(distortionAxis, position)
        + norm / 2.0
    ) / norm;

/*
 * Calculate rotation progress.
 */

float localprogress =
    clamp(
        (
            fract(
                uPosition * 7.0 * 0.05
            )
            -
            0.01 *
            uDistortion *
            offset
        )
        /
        (
            1.0 -
            0.01 *
            uDistortion
        ),

        0.0,
        2.0
    );

/*
 * Smooth the rotation.
 */

localprogress =
    qinticInOut(localprogress) * PI;

/*
 * Rotate the vertices.
 */

newpos =
    rotate(
        newpos,
        rotationAxis,
        localprogress
    );

gl_Position =
    projectionMatrix *
    modelViewMatrix *
    vec4(newpos, 1.0);


}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;

varying vec2 vUv;

void main() {

/*
  Preserve image aspect ratio.
*/

float imageRatio =
    uImageSize.x / uImageSize.y;

float planeRatio =
    uPlaneSize.x / uPlaneSize.y;

vec2 ratio = vec2(1.0);

if (imageRatio > planeRatio) {
    ratio.x = planeRatio / imageRatio;
} else {
    ratio.y = imageRatio / planeRatio;
}

vec2 uv = vec2(
    vUv.x * ratio.x +
    (1.0 - ratio.x) * 0.5,

    vUv.y * ratio.y +
    (1.0 - ratio.y) * 0.5
);

vec4 textureColor =
    texture2D(uTexture, uv);

gl_FragColor = textureColor;


}
`;

/* -----------------------------
Single Image
----------------------------- */

function GalleryImage({
  image,
  index,
  total,
  scroll,
  itemHeight,
  totalHeight,
  viewportHeight,
}) {
  const mesh = useRef();

  const texture = useTexture(image);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uPosition: { value: 0 },
        uDistortion: { value: 3 },
        distortionAxis: { value: new THREE.Vector3(1, 1, 0) },
        rotationAxis: { value: new THREE.Vector3(0, 1, 0) },
        uImageSize: {
          value: new THREE.Vector2(
            texture.image?.naturalWidth || 1000,
            texture.image?.naturalHeight || 1000
          ),
        },
        uPlaneSize: { value: new THREE.Vector2(1, 1) },
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });
  }, [texture]);

  useFrame(() => {
    if (!mesh.current) return;

    let y = index * itemHeight - scroll.current;

    // Proper modulo that also works when y is negative.
    y =
      ((((y + totalHeight / 2) % totalHeight) + totalHeight) % totalHeight) -
      totalHeight / 2;

    mesh.current.position.y = y;

    // Convert world Y position into the 5 → 15 range.
    const position = THREE.MathUtils.mapLinear(
      y,
      -viewportHeight,
      viewportHeight,
      5,
      15
    );
    material.uniforms.uPosition.value = position;

    // Plane dimensions
    material.uniforms.uPlaneSize.value.set(
      mesh.current.scale.x,
      mesh.current.scale.y
    );
  });

  return (
    <mesh ref={mesh} material={material} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 100, 1]} />
    </mesh>
  );
}

/* -----------------------------
Gallery
----------------------------- */

function Gallery({ images }) {
  const { viewport, size } = useThree();

  const scroll = useRef({ current: 0, target: 0 });

  const dragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  const [itemHeight, setItemHeight] = useState(0);
  const [planeWidth, setPlaneWidth] = useState(0);

  // Calculate image dimensions.
  useEffect(() => {
    const width = Math.min(viewport.width * 0.55, 5);
    const height = width * 0.65;
    const _itemHeight = height + 0.7;

    setPlaneWidth(width);
    setItemHeight(_itemHeight);
  }, [viewport.width, viewport.height]);

  const totalHeight = itemHeight * images.length;
  const viewportHeight = viewport.height;

  // Wheel
  useEffect(() => {
    const handleWheel = (event) => {
      scroll.current.target += event.deltaY * 0.002;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Drag
  useEffect(() => {
    const pointerDown = (event) => {
      dragging.current = true;
      startY.current = event.clientY;
      startScroll.current = scroll.current.target;
    };

    const pointerMove = (event) => {
      if (!dragging.current) return;
      const distance = startY.current - event.clientY;
      scroll.current.target = startScroll.current + distance * 0.02;
    };

    const pointerUp = () => {
      dragging.current = false;
    };

    window.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);

    return () => {
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
    };
  }, []);

  // Animation
  useFrame(() => {
    scroll.current.current = lerp(
      scroll.current.current,
      scroll.current.target,
      0.05
    );
  });

  if (!itemHeight) return null;

  return (
    <>
      {images.map((image, index) => (
        <group key={image + index} scale={[planeWidth, planeWidth * 0.65, 1]}>
          <GalleryImage
            image={image}
            index={index}
            total={images.length}
            scroll={scroll.current}
            itemHeight={itemHeight}
            totalHeight={totalHeight}
            viewportHeight={viewportHeight}
          />
        </group>
      ))}
    </>
  );
}

/* -----------------------------
Main Component
----------------------------- */

export default function RotatingGallery({ images = [] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Gallery images={images} />
      </Canvas>
    </div>
  );
}