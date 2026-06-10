// Extract frames from the reference recording for design analysis.
// Usage: node scripts/extract-frames.mjs <input.mp4> <outDir> [fps=1] [start] [duration]
// Resolves ffmpeg-static from %TEMP%\ffx (kept out of project deps).
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const [input, outDir, fps = "1", start, duration] = process.argv.slice(2);
if (!input || !outDir) {
  console.error("usage: extract-frames.mjs <input> <outDir> [fps] [start] [duration]");
  process.exit(1);
}

const tempRequire = createRequire(join(process.env.TEMP, "ffx", "noop.js"));
const ffmpeg = tempRequire("ffmpeg-static");

mkdirSync(outDir, { recursive: true });

const args = ["-hide_banner", "-loglevel", "error"];
if (start) args.push("-ss", start);
args.push("-i", input);
if (duration) args.push("-t", duration);
args.push("-vf", `fps=${fps},scale=1100:-1`, "-q:v", "3", join(outDir, "f%04d.jpg"));

execFileSync(ffmpeg, args, { stdio: "inherit" });

// report stream info via ffprobe-less trick: count of frames printed by caller (dir listing)
console.log("done");
