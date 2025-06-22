import path from 'path';
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
    } else if (oldHash !== hash) {
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

const latest = [
  {
    path: "assets/assets2/index2.html",
    hash: "2d45c5f7dc94e15bc5b5c806411ec817",
  },
  {
    path: "assets/assets2/index2.js",
    hash: "d41d8cd98f00b204e9800998ecf8427e",
  },
  {
    path: "assets/index.css",
    hash: "ffc2176851996047711f5e568ef8fccc",
  },
];

const previous = [
  {
    path: "assets/assets2/index2.html",
    hash: "2d45c5f7dc94e15bc5b5c806411ecaaa",
    size: 205,
  },
  {
    path: "assets/assets2/index2.js",
    hash: "d41d8cd98f00b204e9800998ecf8427e",
    size: 0,
  },
  {
    path: "assets/index.css",
    hash: "ffc2176851996047711f5e568ef8f0a1",
    size: 26,
  },
];
