"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import KnobMesh from "./KnobMesh";

/**
 * Isolated R3F island — code-split via next/dynamic so three.js stays out
 * of the initial bundle (DESIGN_ANALYSIS §3.3). Frameloop pauses when the
 * section leaves the viewport.
 */
export default function KnobCanvas({
  rotation,
  lightX,
  lightY,
  lightBoost,
  active,
}: {
  rotation: MotionValue<number>;
  lightX: MotionValue<number>;
  lightY: MotionValue<number>;
  lightBoost: MotionValue<number>;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.55, 4.4], fov: 26 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      style={{ touchAction: "none" }}
    >
      <Suspense fallback={null}>
        <KnobMesh
          rotation={rotation}
          lightX={lightX}
          lightY={lightY}
          lightBoost={lightBoost}
        />
      </Suspense>
    </Canvas>
  );
}
