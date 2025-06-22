import { promises as fs } from 'fs';
function compareDiff(latest, previous) {
  const latestMap = new Map(latest.map((f) => [f.path, f.hash]));
  const previousMap = new Map(previous.map((f) => [f.path, f.hash]));

  const diff = {
    changed: [],
    added: [],
    removed: [],
  };

  for (const [path, hash] of latestMap) {

    const oldHash = previousMap.get(path);
    if (oldHash === undefined) {
      diff.added.push({ path, hash });
    }
    else if (oldHash !== hash) {
      diff.changed.push({ path, hash });
    }
  }

  for (const [path, hash] of previousMap) {
    if (!latestMap.has(path)) {
      diff.removed.push({ path, hash });
    }
  }
  return diff;
}

function applyDiffToArtifacts(latest_artifact, diff) {
  const addedMap = new Map(diff.added.map((a) => [a.path, a.hash]));
  const changedMap = new Map(diff.changed.map((c) => [c.path, c.hash]));

  const result = [];

  const seenPaths = new Set();

  for (const item of latest_artifact) {
    const path = item.path;

    if (changedMap.has(path)) {
      result.push({
        path,
        hash: changedMap.get(path),
      });
    } else {
      result.push(item);
    }

    seenPaths.add(path);
  }

  for (const [path, hash] of addedMap.entries()) {
    if (!seenPaths.has(path)) {
      result.push({ path, hash });
    }
  }

  return result;
}

const latestPath=process.argv[2];
const previousPath=process.argv[3];
const latestRaw = await fs.readFile(latestPath);
const previousRaw = await fs.readFile(previousPath);
const latest = JSON.parse(latestRaw);
const previous = JSON.parse(previousRaw);

const diff = compareDiff(latest,previous);

console.log(diff)