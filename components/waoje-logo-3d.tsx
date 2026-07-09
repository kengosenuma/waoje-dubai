"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Renders the real WAOJE logo (public/brand/waoje-icon-transparent.png) as a
// textured 3D plate that rotates in genuine 3D space, so the shape stays
// pixel-accurate to the official mark instead of a hand-traced approximation.
function LogoPlate() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "/brand/waoje-icon-transparent.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.9;
    }
  });

  const aspect = 174 / 160;
  const height = 2.4;
  const width = height * aspect;
  const depth = 0.1;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -depth / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[width * 0.99, height * 0.99, depth]} />
        <meshStandardMaterial color="#C9A227" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

export function WaojeLogo3D({ size = 200 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4], fov: 40 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[2, 3, 4]} intensity={1.6} />
        <directionalLight position={[-2, -1, -3]} intensity={0.8} color="#ffffff" />
        <LogoPlate />
      </Canvas>
    </div>
  );
}
