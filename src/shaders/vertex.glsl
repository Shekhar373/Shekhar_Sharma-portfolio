uniform float uTime;
      varying vec2 vUv;
      varying float noise;

void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float noise = sin(modelPosition.x*5.0 + modelPosition.y*4.0 + uTime)*0.12;
    modelPosition.z += noise;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}