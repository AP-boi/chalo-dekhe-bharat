'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { DayItinerary } from '@/lib/schemas/itinerary';

export function latLngToVector3(lat: number, lng: number, radius: number = 2): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function createArcCurve(p1: THREE.Vector3, p2: THREE.Vector3, elevation: number = 0.4): THREE.CatmullRomCurve3 {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const dist = p1.distanceTo(p2);
  mid.normalize().multiplyScalar(p1.length() + elevation * Math.min(dist, 3));
  return new THREE.CatmullRomCurve3([p1, mid, p2]);
}

interface GlobeMeshProps {
  days: DayItinerary[];
  selectedDayIndex: number | null;
  onSelectDay: (index: number) => void;
}

function GlobeContent({ days, selectedDayIndex, onSelectDay }: GlobeMeshProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const earthRadius = 2.0;

  const [earthMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
  ]);

  // Points on globe
  const dayPoints = useMemo(() => {
    return days.map((day) => ({
      ...day,
      vector: latLngToVector3(day.lat, day.lng, earthRadius + 0.04),
    }));
  }, [days, earthRadius]);

  // Route arcs between consecutive days
  const arcs = useMemo(() => {
    const list: THREE.CatmullRomCurve3[] = [];
    for (let i = 0; i < dayPoints.length - 1; i++) {
      const p1 = dayPoints[i].vector;
      const p2 = dayPoints[i + 1].vector;
      list.push(createArcCurve(p1, p2, 0.3));
    }
    return list;
  }, [dayPoints]);

  // Slow auto rotate
  useFrame((_, delta) => {
    if (globeGroupRef.current && selectedDayIndex === null) {
      globeGroupRef.current.rotation.y += 0.15 * delta;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Base Earth Sphere */}
      <mesh>
        <sphereGeometry args={[earthRadius, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere Halo Glow */}
      <mesh>
        <sphereGeometry args={[earthRadius + 0.08, 32, 32]} />
        <meshBasicMaterial
          color="#ff6a2b"
          side={THREE.BackSide}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Day Markers */}
      {dayPoints.map((pt, idx) => {
        const isSelected = selectedDayIndex === idx;

        return (
          <group key={`pin-${idx}`} position={pt.vector}>
            {/* Glowing pin head */}
            <mesh onClick={() => onSelectDay(idx)}>
              <sphereGeometry args={[isSelected ? 0.09 : 0.06, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#FFB100" : "#FF6A2B"} />
            </mesh>

            {/* Pulsing ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.12, 32]} />
              <meshBasicMaterial
                color={isSelected ? "#FFB100" : "#FF6A2B"}
                transparent
                opacity={isSelected ? 0.9 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* HTML Label Tag */}
            <Html distanceFactor={10} zIndexRange={[100, 0]}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (document.body.style.overflow === 'hidden') return;
                  onSelectDay(idx);
                }}
                className={`cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider whitespace-nowrap transition-all shadow-xl flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#FFB100] text-[#1B1410] scale-110 border-2 border-[#1B1410]"
                    : "bg-[#1B1410]/90 text-[#FFF6E9] border border-[#FF6A2B]/40 hover:bg-[#FF6A2B] hover:text-[#1B1410]"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#FF6A2B] text-[#FFF6E9] text-[9px] flex items-center justify-center font-mono">
                  {pt.dayNumber}
                </span>
                <span>{pt.locationName.split('&')[0]}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Route Arcs */}
      {arcs.map((curve, idx) => {
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={`arc-${idx}`}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color="#FFB100" linewidth={2} transparent opacity={0.8} />
          </line>
        );
      })}
    </group>
  );
}

interface PlannerGlobe3DProps {
  days: DayItinerary[];
  selectedDayIndex: number | null;
  onSelectDay: (index: number) => void;
  className?: string;
}

export function PlannerGlobe3D({ days, selectedDayIndex, onSelectDay, className = "w-full h-full" }: PlannerGlobe3DProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#fff6e9" />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#ff6a2b" />
        
        <GlobeContent
          days={days}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={onSelectDay}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3.2}
          maxDistance={8.0}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}

export default PlannerGlobe3D;
