import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './ColorBends.css';

interface ColorBendsProps {
  colors?: string[];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  transparent?: boolean;
  autoRotate?: number;
  color?: string;
}

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform float uRotation;
uniform float uParallax;
uniform float uNoise;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform float uAutoRotate;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
  return n;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;

  float rotation = uRotation + uTime * uAutoRotate * 0.1;
  coords = rotate2D(coords, rotation);

  float t = uTime * uSpeed;

  float mouseWarp = 0.0;
  vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, rotation);
  float mDist = length(coords - mPos);
  mouseWarp = uMouseInfluence * exp(-mDist * mDist * 2.0);

  vec2 wave = coords;
  wave.y += sin(coords.x * uFrequency + t) * uWarpStrength;
  wave.x += cos(coords.y * uFrequency - t * 0.7) * uWarpStrength;
  wave += normalize(coords) * uParallax * sin(t * 0.5);

  float pattern = 0.0;
  pattern += sin(wave.y * uScale + t * 0.5) * 0.5;
  pattern += sin(wave.x * uScale - t * 0.3) * 0.3;
  pattern += sin((wave.x + wave.y) * uScale * 0.5 + t * 0.8) * 0.2;
  pattern = (pattern + 1.0) * 0.5;

  float noiseVal = noise(wave * 2.0 + t * 0.1) * uNoise;
  pattern += noiseVal * 0.1;

  float r = sin(pattern * PI + t * 0.3) * 0.5 + 0.5 + mouseWarp * 0.3;
  float g = cos(pattern * PI + t * 0.5) * 0.5 + 0.5 + mouseWarp * 0.2;
  float b = sin(pattern * PI * 2.0 + t * 0.7) * 0.5 + 0.5 + mouseWarp * 0.25;

  vec3 col = mix(uColor1, uColor2, r);
  col = mix(col, uColor3, b);
  col *= vec3(r, g, b) * 0.8;

  float alpha = length(col) * 0.6;

  gl_FragColor = vec4(col, alpha);
}
`;

export default function ColorBends({
  colors = ["#ff5c7a", "#8a5cff", "#00ffd1"],
  rotation = 0,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise: noiseLevel = 0.1,
  transparent = true,
  autoRotate = 0,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, transparent ? 0 : 1);

    let program: Program;
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e: MouseEvent) {
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      ];
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
      }
    }
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    const rotationRad = (rotation * Math.PI) / 180;
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uRotation: { value: rotationRad },
        uParallax: { value: parallax },
        uNoise: { value: noiseLevel },
        uColor1: { value: hexToVec3(colors[0]) },
        uColor2: { value: hexToVec3(colors[1]) },
        uColor3: { value: hexToVec3(colors[2]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: mouseInfluence },
        uAutoRotate: { value: autoRotate }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    gl.canvas.addEventListener('mousemove', handleMouseMove);
    gl.canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    function update(time: number) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.uTime.value = time * 0.001;

      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      program.uniforms.uMouse.value[0] = currentMouse[0];
      program.uniforms.uMouse.value[1] = currentMouse[1];

      renderer.render({ scene: mesh });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      gl.canvas.removeEventListener('mousemove', handleMouseMove);
      gl.canvas.removeEventListener('mouseleave', handleMouseLeave);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colors, rotation, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noiseLevel, transparent, autoRotate]);

  return <div ref={containerRef} className="color-bends-container" />;
}
