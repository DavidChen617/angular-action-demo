export default function compareDiff(latest, previous) {
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