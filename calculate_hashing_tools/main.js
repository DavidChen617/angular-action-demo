import listFilesRecursive from "./recursion.js";
import md5File from "./md5_algorithm.js";
import writeJsonLog from "./createJsonFile.js";

const path = process.argv[2];
const arr = await listFilesRecursive(path);

let md5Files = [];

for (let i = 0; i < arr.length; i++) {
  md5Files.push(await md5File(arr[i]));
}

await writeJsonLog(md5Files);

