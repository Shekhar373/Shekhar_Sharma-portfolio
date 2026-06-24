uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float noise;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    texColor.rgb += noise; // Apply noise to the color
    gl_FragColor = texColor;
}
 