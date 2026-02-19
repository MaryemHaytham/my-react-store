import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function ProductModel({ color = '#c9a962' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main product body - abstract representation */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]} scale={0.9}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Base ring */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 64]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

interface ProductViewer3DProps {
  selectedColor?: string;
}

export function ProductViewer3D({ selectedColor = '#c9a962' }: ProductViewer3DProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] canvas-container rounded-xl overflow-hidden bg-gradient-to-b from-muted/50 to-muted">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
          color="#c9a962"
        />
        
        <ProductModel color={selectedColor} />
        
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
        
        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

export default ProductViewer3D;
