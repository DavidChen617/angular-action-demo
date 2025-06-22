import { promises as fs } from "fs";
import path from "path";

export default async function applyDiffToArtifacts(
  latestDir,
  diff,
  outputDir = "dist_to_deliver"
) {
  const filePath = [
    ...diff.added.map((f) => f.path),
    ...diff.changed.map((f) => f.path),
  ];
  await fs.mkdir(outputDir, { recursive: true });

  for (const relativePath of filePath) {
    const fileName = path.basename(relativePath);
    const sourcePath = path.resolve(latestDir, fileName);
    const destPath = path.join(outputDir, fileName);

    try {
      await fs.copyFile(sourcePath, destPath);
    } catch (e) {}
  }
}