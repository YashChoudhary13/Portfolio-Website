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

      // --- roughness: base 0.53 ± broad concentric sectors (low-frequency
      // dominant — high frequency reads as grit at display size) ---
      const streak =
        ringNoise(r) * 0.55 + ringNoise(r * 2.7) * 0.37 + ringNoise(r * 7.1) * 0.08;
      const rough = 135 + (streak - 0.5) * 90; // ~0.35..0.7 of 255
      img.data[i] = rough;
      img.data[i + 1] = rough;
      img.data[i + 2] = rough;
      img.data[i + 3] = 255;

      // --- anisotropy direction: RADIAL in UV space (highlight elongates
      // along the encoded direction → radial starburst fan). Canvas y is
      // down, UV v is up (flipY), so negate dy. ---
      const len = r || 1;
      aimg.data[i] = ((dx / len) * 0.5 + 0.5) * 255;
      aimg.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
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

/**
 * Procedural equirectangular studio (1024×512): one long bright overhead
 * strip (the key reflection the anisotropy stretches into a starburst),
 * a dim counter-strip below the horizon, soft side fills. Set directly as
 * scene.environment — no network HDRIs, no Environment-component timing.
 */
export function createStudioEnv() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // mid ambient base — metal needs a fill floor or it mirrors blackness
  ctx.fillStyle = "#2e3338";
  ctx.fillRect(0, 0, w, h);

  // strong top dome light
  const dome = ctx.createLinearGradient(0, 0, 0, h * 0.5);
  dome.addColorStop(0, "rgba(150,160,170,0.95)");
  dome.addColorStop(1, "rgba(46,51,56,0)");
  ctx.fillStyle = dome;
  ctx.fillRect(0, 0, w, h * 0.5);

  // darker floor below horizon for contrast
  const floor = ctx.createLinearGradient(0, h * 0.55, 0, h);
  floor.addColorStop(0, "rgba(10,12,14,0)");
  floor.addColorStop(1, "rgba(10,12,14,0.85)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, h * 0.55, w, h * 0.45);

  // key strip — long, bright, slightly cool
  const key = ctx.createLinearGradient(0, h * 0.3, 0, h * 0.46);
  key.addColorStop(0, "rgba(255,255,255,0)");
  key.addColorStop(0.5, "rgba(248,250,252,0.95)");
  key.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = key;
  ctx.fillRect(0, h * 0.3, w, h * 0.16);

  // counter strip below horizon — dimmer bounce
  const counter = ctx.createLinearGradient(0, h * 0.62, 0, h * 0.74);
  counter.addColorStop(0, "rgba(120,130,140,0)");
  counter.addColorStop(0.5, "rgba(120,130,140,0.35)");
  counter.addColorStop(1, "rgba(120,130,140,0)");
  ctx.fillStyle = counter;
  ctx.fillRect(0, h * 0.62, w, h * 0.12);

  // two soft vertical side fills for rim interest
  for (const cx of [w * 0.18, w * 0.82]) {
    const side = ctx.createRadialGradient(cx, h * 0.5, 10, cx, h * 0.5, w * 0.16);
    side.addColorStop(0, "rgba(150,165,178,0.25)");
    side.addColorStop(1, "rgba(150,165,178,0)");
    ctx.fillStyle = side;
    ctx.fillRect(cx - w * 0.16, 0, w * 0.32, h);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
