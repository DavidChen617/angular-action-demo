import { promises as fs } from "node:fs";
import path from "node:path";

// 建立時間戳
function formatTimestamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes())+
    pad(d.getSeconds())
  );
}

export default async function writeJsonLog(data, dir = "logs") {
  // await fs.mkdir(dir, { recursive: true });

  const timestamp = formatTimestamp();
  // const fileName = `${timestamp.slice(0, 8) + "_" + timestamp.slice(8)}.json`;
  // const fullPath = path.join(dir, fileName);

  const json = JSON.stringify(data, null, 2);

  // await fs.writeFile(fullPath, json, "utf8");

  return json;
}

