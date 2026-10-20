import type { V } from './rigid';

const arc = (a0: number, a1: number, n: number): V[] =>
  Array.from({ length: n - 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * (i + 1)) / n) * Math.PI) / 180;
    return [30 + 28 * Math.cos(a), 32 + 28 * Math.sin(a)];
  });

export const logoOutlines: V[][] = [
  [[30, 18], [5.75, 18], ...arc(210, 150, 6), [5.75, 46], [30, 46]],
  [[5.75, 18], ...arc(210, 330, 8), [54.25, 18]],
  [[30, 27], [57.55, 27], ...arc(-10.3, 10.3, 2), [57.55, 37], [30, 37]],
  [[54.25, 46], ...arc(30, 150, 8), [5.75, 46]],
  [[62, 52], [78, 52], [78, 59], [62, 59]],
];
