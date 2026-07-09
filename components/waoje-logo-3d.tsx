"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Builds a hollow-outline triangle (line-art look) as an extrudable Shape
// by tracing the outer path and cutting a slightly-inset inner path as a hole.
function outlineTriangleShape(points: [number, number][], strokeWidth: number) {
  const outer = new THREE.Shape();
  points.forEach(([x, y], i) => (i === 0 ? outer.moveTo(x, y) : outer.lineTo(x, y)));
  outer.closePath();

  const centroid = points.reduce(
    (acc, [x, y]) => [acc[0] + x / points.length, acc[1] + y / points.length],
    [0, 0]
  );
  const inset: [number, number][] = points.map(([x, y]) => {
    const dx = x - centroid[0];
    const dy = y - centroid[1];
    const len = Math.hypot(dx, dy);
    const scale = Math.max(0, (len - strokeWidth) / len);
    return [centroid[0] + dx * scale, centroid[1] + dy * scale];
  });

  const hole = new THREE.Path();
  inset.forEach(([x, y], i) => (i === 0 ? hole.moveTo(x, y) : hole.lineTo(x, y)));
  hole.closePath();
  outer.holes.push(hole);

  return outer;
}

function LogoMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    const extrudeSettings = { depth: 8, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 2 };

    const outerShape = outlineTriangleShape(
      [
        [100, 45],
        [42, 158],
        [158, 158],
      ],
      7
    );
    const innerShape = outlineTriangleShape(
      [
        [100, 72],
        [62, 140],
        [138, 140],
      ],
      6
    );
    const dotShape = new THREE.Shape().absarc(100, 107, 13, 0, Math.PI * 2, false);

    const outerGeo = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
    const innerGeo = new THREE.ExtrudeGeometry(innerShape, extrudeSettings);
    const dotGeo = new THREE.ExtrudeGeometry(dotShape, { ...extrudeSettings, depth: 10 });

    // Center + normalize: source coords are in a 0..200 SVG box, recentre on (100,100) and flip Y.
    [outerGeo, innerGeo, dotGeo].forEach((geo) => {
      geo.translate(-100, -100, -4);
      geo.scale(1, -1, 1);
      geo.scale(0.018, 0.018, 0.018);
    });

    return { outerGeo, innerGeo, dotGeo };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometries.outerGeo}>
        <meshStandardMaterial color="#E5BB4B" emissive="#C9A227" emissiveIntensity={0.35} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh geometry={geometries.innerGeo}>
        <meshStandardMaterial color="#E5BB4B" emissive="#C9A227" emissiveIntensity={0.35} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh geometry={geometries.dotGeo}>
        <meshStandardMaterial color="#E4342A" metalness={0.5} roughness={0.4} />
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
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 4]} intensity={2.2} />
        <directionalLight position={[-2, -1, -3]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#E5BB4B" />
        <LogoMesh />
      </Canvas>
    </div>
  );
}
