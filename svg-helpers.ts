import { Pair, Matrix, ChartOptions } from "./types.ts"

export const transformToTime = (str: string) => new Date(str).getTime()

export const createDataNormalizer = (
  [minT, maxT]: Pair,
  [minY, maxY]: Pair,
  { L, W, B, H }: ChartOptions
) => ([t, y]: Pair): Pair => [
  L + ((t - minT) / (maxT - minT)) * W,
  B + ((y - minY) / (maxY - minY)) * H,
]

export const pair = (i: number) => (values: string[]): Pair => [
  transformToTime(values[0]),
  parseFloat(values[i]),
]

export const createGetSeries = (matrix: Matrix) => (col: number) =>
  matrix.reduce(
    ($: Pair[], values: string[]): Pair[] => [...$, pair(col)(values)],
    []
  )

export const createSeriesIdList = ({ length }: any[]) =>
  Array.from(Array(length - 1), (_, i) => i + 1)

export const getXRange = (matrix: Matrix): Pair => {
  const dates = matrix.map(([value]: string[]) => transformToTime(value))
  return [Math.min(...dates), Math.max(...dates)]
}

export const getYRange = (matrix: Matrix): Pair => {
  return [0, 100] // TODO: calculate yRange dynamically based on series data
}

export const createGetColor = ({ COLOR_LIST }: ChartOptions) => (
  seriesId: number
): string => COLOR_LIST[seriesId % COLOR_LIST.length]
