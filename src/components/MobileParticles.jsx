import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  attribute float aScale;
  attribute vec3 aRandom;
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    
    // Upward flow
    float flowSpeed = 2.0;
    pos.y += uTime * flowSpeed * aRandom.y;
    
    // Wrap around smoothly (range -10 to 10)
    pos.y = mod(pos.y + 10.0, 20.0) - 10.0;
    
    // Organic, gentle wind sway
    pos.x += sin(uTime * aRandom.z * 0.5 + pos.y * 0.3) * 1.5 * aRandom.x;
    pos.z += cos(uTime * aRandom.x * 0.5 + pos.y * 0.3) * 1.5 * aRandom.z;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation for depth perception
    gl_PointSize = (12.0 * aScale) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Premium monochrome / glass color palette
    float depth = clamp((pos.z + 5.0) / 10.0, 0.0, 1.0);
    float pulse = sin(uTime * 2.0 + aRandom.x * 10.0) * 0.5 + 0.5;
    
    // Premium dark/monochrome colors for light background visibility
    vec3 baseColor = vec3(0.3, 0.3, 0.35);
    vec3 highlight = vec3(0.1, 0.1, 0.15);
    
    vColor = mix(baseColor, highlight, pulse * depth);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Make particles soft circles
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft gradient from center to edge
    float alpha = (1.0 - (dist * 2.0));
    // Tone down the overall opacity slightly, but keep it high enough to see
    alpha *= 0.8;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const ParticleSwarm = () => {
  const pointsRef = useRef();
  const materialRef = useRef();
  const count = 3000; // Perfect balance of density and mobile performance

  const [positions, scales, randoms] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Cylinder distribution
      const radius = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Spread on Y
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      
      scales[i] = Math.random() * 0.8 + 0.4; // Slightly larger for better visibility
      
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random() * 0.4 + 0.6; // Flow speed variation
      randoms[i * 3 + 2] = Math.random();
    }
    return [positions, scales, randoms];
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      // Slowly rotate the entire swarm column
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

const MobileParticles = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <ParticleSwarm />
      </Canvas>
      {/* Subtle bottom fade to blend with the rest of the site */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(to bottom, transparent, var(--bg-color))',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default MobileParticles;
