import type { ComponentType } from "react";
import DeepVerifyVisual from "@/components/sections/projects/DeepVerifyVisual";
import RevoVisual from "@/components/sections/projects/RevoVisual";
import TheMexVisual from "@/components/sections/projects/TheMexVisual";

/** Hero visual per case study — shared by the index preview and detail hero. */
export const PROJECT_VISUALS: Record<string, ComponentType> = {
  deepverify: DeepVerifyVisual,
  revo: RevoVisual,
  themex: TheMexVisual,
};
