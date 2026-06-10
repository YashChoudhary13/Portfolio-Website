import * as THREE from "three";

/**
 * Procedural brushed-aluminum maps (DESIGN_ANALYSIS §1.7) — zero downloads.
 * The knob face is brushed in concentric circles, so:
 *  - roughnessMap: fine concentric streak noise (radius-keyed)
 *  - anisotropyMap: per-pixel tangential direction (RG-encoded), giving the
 *    long radial specular streaks real machined metal shows.
 */
export function createBrushedMaps(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);

  const aniso = document.createElement("canvas");
  aniso.width = aniso.height = size;
  const actx = aniso.getContext("2d")!;
  const aimg = actx.createImageData(size, size);

  const half = size / 2;

  // radius-keyed pseudo-noise → every pixel on the same ring shares a streak
  const ringNoise = (r: number) => {
    const s = Math.sin(r * 137.21) * 43758.5453;
    return s - Math.floor(s);
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - half;
      const dy = y - half;
      const r = Math.sqrt(dx * dx + dy * dy);
      const i = (y * size + x) * 4;

      // --- roughness: base 0.55 ± concentric streaks, finer near rim ---
      const streak =
        ringNoise(r) * 0.5 + ringNoise(r * 2.7) * 0.3 + ringNoise(r * 7.1) * 0.2;
      const rough = 140 + (streak - 0.5) * 70; // ~0.43..0.67 of 255
      img.data[i] = rough;
      img.data[i + 1] = rough;
      img.data[i + 2] = rough;
      img.data[i + 3] = 255;

      // --- anisotropy direction: tangent to the ring (θ + 90°) ---
      const theta = Math.atan2(dy, dx) + Math.PI / 2;
      aimg.data[i] = (Math.cos(theta) * 0.5 + 0.5) * 255;
      aimg.data[i + 1] = (Math.sin(theta) * 0.5 + 0.5) * 255;
      aimg.data[i + 2] = 255; // full strength
      aimg.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  actx.putImageData(aimg, 0, 0);

  const roughnessMap = new THREE.CanvasTexture(canvas);
  const anisotropyMap = new THREE.CanvasTexture(aniso);
  for (const t of [roughnessMap, anisotropyMap]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
  }

  return { roughnessMap, anisotropyMap };
}
