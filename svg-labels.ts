import { LabelProps, Pair, ChartOptions } from "./types.ts"

export const createXLabel = (
  [minT, maxT]: Pair,
  { W, H, T, R, B, L, X_TICKS, Y_TICKS, FONT_SIZE }: ChartOptions
) => ({ index, label }: LabelProps) => `
  <text x="${L + (W / X_TICKS) * index}" y="${FONT_SIZE * 1.5 - B}">
    ${
      label ??
      new Date(
        (1 / X_TICKS) * index * (maxT - minT) + minT
      ).toLocaleDateString()
    }
  </text>
`

export const createYLabel = (
  [minY, maxY]: Pair,
  { W, H, T, R, B, L, X_TICKS, Y_TICKS, FONT_SIZE }: ChartOptions
) => ({ index, label }: LabelProps) => `
  <text x="${L - FONT_SIZE / 2}" y="${-(B + (H / Y_TICKS) * index)}">
    ${label ?? minY + ((maxY - minY) / Y_TICKS) * index}
  </text>
`

export const createTicks = (TICKS: number) =>
  Array.from(Array(TICKS), (_, index) => ({ index }))
