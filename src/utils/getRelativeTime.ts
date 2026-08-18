const UNITS: [string, number][] = [
  ["년", 60 * 60 * 24 * 365],
  ["개월", 60 * 60 * 24 * 30],
  ["일", 60 * 60 * 24],
  ["시간", 60 * 60],
  ["분", 60],
];

export function getRelativeTime(dateString: string): string {
  const diffSeconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000,
  );

  if (diffSeconds < 60) return "방금 전";

  for (const [label, secondsInUnit] of UNITS) {
    const value = Math.floor(diffSeconds / secondsInUnit);
    if (value >= 1) return `${value}${label} 전`;
  }

  return "방금 전";
}
