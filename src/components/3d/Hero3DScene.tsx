import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ 
  position, 
  color, 
  scale = 1, 
  rotationSpeed = 0.5,
  floatIntensity = 1 
}: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.5;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({ 
  position, 
  color,
  scale = 1 
}: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        scale + Math.sin(state.clock.elapsedTime * 2) * 0.1
      );
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingBox({ 
  position, 
  color,
  scale = 1 
}: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 100;
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c9a962"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#c9a962" intensity={0.5} />
        
        <Environment preset="city" />
        
        <FloatingShape 
          position={[-3, 1, 0]} 
          color="#c9a962" 
          scale={0.8}
          rotationSpeed={0.3}
        />
        <FloatingShape 
          position={[3.5, -0.5, -2]} 
          color="#d4af37" 
          scale={0.6}
          rotationSpeed={0.5}
        />
        
        <GlowingSphere position={[4, 2, -1]} color="#f0c040" scale={0.8} />
        <GlowingSphere position={[-4, -1, -2]} color="#c9a962" scale={0.6} />
        
        <FloatingBox position={[0, -2, -3]} color="#8b7355" scale={0.7} />
        <FloatingBox position={[-2, 2.5, -4]} color="#deb887" scale={0.5} />
        
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default Hero3DScene;
