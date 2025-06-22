import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";

export default async function md5File(filePath) {

  const buffer = await readFile(filePath);
  
  const stats = await stat(filePath);

  const md5 = createHash("md5").update(buffer).digest("hex");

  return {
    path:filePath,
    hash: md5,
    // size: stats.size,
  };
}
