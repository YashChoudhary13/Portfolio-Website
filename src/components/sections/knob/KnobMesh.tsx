"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { createBrushedMaps, createStudioEnv } from "./knobTextures";

const TILT = 0.1; // slight lean back — face-on with depth

/**
 * The machined knob (DESIGN_ANALYSIS §1.7): lathe-profiled spun-aluminum
 * face inside a near-black bezel, lit by a procedural studio environment
 * and a cursor-tracked key light. Physical light units (three r155+).
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
  const envTex = useMemo(() => createStudioEnv(), []);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    scene.environment = envTex;
    return () => {
      scene.environment = null;
    };
  }, [scene, envTex]);

  // Geometry is composed from primitives (cylinder caps, rings) — their
  // normals are guaranteed correct, and the face cap's planar UVs map the
  // disc-designed roughness/anisotropy textures 1:1.
  const aluminum = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#b9bec4"),
        metalness: 1,
        roughness: 0.38,
        roughnessMap: maps.roughnessMap,
        anisotropy: 1.0,
        anisotropyMap: maps.anisotropyMap,
        clearcoat: 0.25,
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.8,
      }),
    [maps],
  );

  const grooveMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#7d838a"),
        metalness: 1,
        roughness: 0.5,
        envMapIntensity: 1.2,
      }),
    [],
  );

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#16181b"),
        metalness: 0.75,
        roughness: 0.45,
        clearcoat: 0.2,
        envMapIntensity: 1.1,
      }),
    [],
  );

  useFrame(() => {
    if (spin.current) {
      spin.current.rotation.y = -THREE.MathUtils.degToRad(rotation.get());
    }
    if (key.current) {
      key.current.position.set(lightX.get() * 2.6, 0.6 + lightY.get() * -1.6, 3.2);
      key.current.intensity = 22 + lightBoost.get() * 30;
    }
  });

  return (
    <>
      <group rotation={[Math.PI / 2 - TILT, 0, 0]}>
        {/* static bezel: wall + flat top ring */}
        <mesh material={bezelMaterial} position={[0, 0.17, 0]}>
          <cylinderGeometry args={[1.23, 1.23, 0.35, 128, 1, true]} />
        </mesh>
        <mesh
          material={bezelMaterial}
          position={[0, 0.345, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.998, 1.23, 128]} />
        </mesh>

        <group ref={spin}>
          {/* spun-aluminum body — cap carries the starburst */}
          <mesh material={aluminum} position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.995, 0.995, 0.4, 128]} />
          </mesh>

          {/* machined groove ring inset into the face */}
          <mesh
            material={grooveMaterial}
            position={[0, 0.4005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.78, 0.812, 128]} />
          </mesh>

          {/* accent index dot at 12 o'clock */}
          <mesh position={[0, 0.402, -0.68]}>
            <cylinderGeometry args={[0.038, 0.038, 0.012, 24]} />
            <meshStandardMaterial
              color="#c2a8df"
              emissive="#c2a8df"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* cursor-tracked key light — moves the speculars (physical units) */}
      <pointLight ref={key} position={[0, 0.6, 3.2]} intensity={22} decay={2} distance={14} />
      <ambientLight intensity={0.2} />
    </>
  );
}
