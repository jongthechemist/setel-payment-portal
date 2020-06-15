export function pickRandom<T>(...values: T[]): T {
  const size = values.length;
  const randomIndex = Math.min(Math.floor(Math.random() * size), size - 1);
  return values[randomIndex];
}
