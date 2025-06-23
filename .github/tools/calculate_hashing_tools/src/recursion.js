import { readdir } from "node:fs/promises";
import path from "node:path";

const extensions = new Set(["js", "html", "css", "png", "svg"]);

export default async function listFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  // 為了並行遞迴、加速 IO，把每個 entry 轉成 Promise
  const tasks = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 子資料夾 → 繼續遞迴
      return listFilesRecursive(fullPath);
    }

    if (entry.isFile()) {
      // 比對副檔名（去掉小數點、統一小寫）
      const ext = path.extname(entry.name).slice(1).toLocaleLowerCase();
      return extensions.has(ext) ? [fullPath] : [];
    }
    return []; // 其他型別（如符號連結）直接忽略
  });

  const nested = await Promise.all(tasks);
  return nested.flat();
}
