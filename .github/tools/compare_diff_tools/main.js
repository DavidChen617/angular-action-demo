import { promises as fs } from "fs";
import compareDiff from "./src/compareDiff.js";
import applyDiffToArtifacts from "./src/applyDiffToArtifacts.js";

const latestPath = process.argv[2];
const previousPath = process.argv[3];

const latestRaw = await fs.readFile(latestPath);
const previousRaw = await fs.readFile(previousPath);

const latest = JSON.parse(latestRaw);
const previous = JSON.parse(previousRaw);

const diff = compareDiff(latest, previous);

const latestDir = process.argv[4];
const diffDirPath = process.argv[5];

applyDiffToArtifacts(latestDir, diff, diffDirPath);

console.log(diff);
