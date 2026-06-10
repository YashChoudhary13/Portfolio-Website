"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, Instance, Instances, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { createBrushedMaps } from "./knobTextures";

const RIDGES = 72;
const TILT = 0.12; // slight lean back — face-on with depth

/**
 * The machined knob (DESIGN_ANALYSIS §1.7): lathe-profiled aluminum body,
 * 72 grip ridges, accent index dot, procedural Lightformer studio for the
 * anisotropic streaks, and a cursor-tracked key light.
 */
export default function KnobMesh({
  rotation,
  lightX,
  lightY,
  lightBoost,
}: {
  rotation: MotionValue<number>; // degrees, clockwise on screen
  lightX: MotionValue<number>; // -1..1
  lightY: MotionValue<number>; // -1..1
  lightBoost: MotionValue<number>; // 0..1 hover proximity
}) {
  const spin = useRef<THREE.Group>(null);
  const key = useRef<THREE.PointLight>(null);

  const maps = useMemo(() => createBrushedMaps(), []);

  // chamfered lathe profile: center → machined groove → top face → bevel → wall
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.001, 0.42),
      new THREE.Vector2(0.6, 0.42),
      new THREE.Vector2(0.63, 0.405), // machined groove
      new THREE.Vector2(0.66, 0.42),
      new THREE.Vector2(0.82, 0.42),
      new THREE.Vector2(0.9, 0.395), // chamfer
      new THREE.Vector2(0.97, 0.33),
      new THREE.Vector2(1.0, 0.24),
      new THREE.Vector2(1.0, 0.0),
      new THREE.Vector2(0.93, 0.0),
    ];
    return pts;
  }, []);

  const aluminum = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c9ced4"),
        metalness: 1,
        roughness: 0.32,
        roughnessMap: maps.roughnessMap,
        anisotropy: 0.9,
        anisotropyMap: maps.anisotropyMap,
        clearcoat: 0.25,
        clearcoatRoughness: 0.2,
      }),
    [maps],
  );

  const ridgeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#aeb4bb"),
        metalness: 1,
        roughness: 0.45,
      }),
    [],
  );

  useFrame(() => {
    if (spin.current) {
      spin.current.rotation.y = -THREE.MathUtils.degToRad(rotation.get());
    }
    if (key.current) {
      key.current.position.set(lightX.get() * 2.6, 0.6 + lightY.get() * -1.6, 3.2);
      key.current.intensity = 6 + lightBoost.get() * 7;
    }
  });

  return (
    <>
      <group rotation={[Math.PI / 2 - TILT, 0, 0]}>
        <group ref={spin}>
          {/* body */}
          <mesh material={aluminum}>
            <latheGeometry args={[profile, 128]} />
          </mesh>

          {/* grip ridges around the wall */}
          <Instances range={RIDGES} material={ridgeMaterial} frustumCulled={false}>
            <boxGeometry args={[0.016, 0.2, 0.05]} />
            {Array.from({ length: RIDGES }, (_, i) => {
              const a = (i / RIDGES) * Math.PI * 2;
              return (
                <Instance
                  key={i}
                  position={[Math.sin(a) * 1.0, 0.12, Math.cos(a) * 1.0]}
                  rotation={[0, a, 0]}
                />
              );
            })}
          </Instances>

          {/* accent index dot at 12 o'clock */}
          <mesh position={[0, 0.43, -0.72]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.015, 24]} />
            <meshStandardMaterial
              color="#66f0c2"
              emissive="#66f0c2"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* cursor-tracked key light — moves the reflections */}
      <pointLight ref={key} position={[0, 0.6, 3.2]} intensity={6} decay={2} distance={12} />
      <ambientLight intensity={0.15} />

      {/* procedural studio — the long streak reflections live here */}
      <Environment frames={1} resolution={256}>
        <Lightformer
          form="rect"
          intensity={5}
          scale={[9, 1.1, 1]}
          position={[0, 4, 2.5]}
          rotation={[-Math.PI / 3.2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          scale={[1.2, 6, 1]}
          position={[-5, 0.5, 2]}
          rotation={[0, Math.PI / 3, 0]}
          color="#dceaf5"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          scale={[1.1, 5, 1]}
          position={[5, -0.5, 2]}
          rotation={[0, -Math.PI / 3, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.8}
          scale={5}
          position={[0, 1, 5]}
        />
      </Environment>
    </>
  );
}
