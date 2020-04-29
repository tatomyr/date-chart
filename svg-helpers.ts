import { Pair, Matrix } from "./types.ts"
import { L, W, B, H } from "./const.ts"

export const transformToTime = (str: string) => new Date(str).getTime()

export const createDataNormalizer = (
  [minT, maxT]: Pair,
  [minY, maxY]: Pair
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
