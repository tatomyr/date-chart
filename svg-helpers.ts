import { Pair, Matrix, ChartOptions } from "./types.ts"
import { NORM } from "./chart-options.ts"

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

export const getRange = (arr: number[]): Pair => [
  Math.min(...arr),
  Math.max(...arr),
]

export const getXRange = (matrix: Matrix): Pair => {
  const dates = matrix.map(([value]: string[]) => transformToTime(value))
  return getRange(dates)
}

// TODO: clean it up
export const getBottomUp = ([minY, maxY]: Pair): Pair => {
  const avgY = (minY + maxY) / 2
  const varY = maxY - minY
  const k = Math.log(varY) / Math.log(10)
  const kRound = Math.round(k)
  const kCeil = Math.ceil(k)
  const kFloor = Math.floor(k)
  const step = NORM * 10 ** kRound
  const bottom = Math.floor(minY / step) * step
  const up = Math.ceil(maxY / step) * step

  console.log(
    {
      minY,
      maxY,
      avgY,
      varY,
      v: varY / avgY,

      kFloor,
      k,
      kRound,
      kCeil,

      step,
      bottom,
      up,
      // TODO: implement different scaling factor for each series
      scaleFactor: 1,
    },
    [minY / step, maxY / step],
    "-->",
    [bottom, up]
  )

  return [bottom, up]
}

export const getYRange = (matrix: Matrix, seriesIdList: number[]): Pair => {
  let getSeries = createGetSeries(matrix)

  const rangeList = seriesIdList.map((col) => {
    const values = getSeries(col).map(([_, y]) => y)
    return getRange(values)
  })

  rangeList.forEach(getBottomUp) // FIXME: delete

  return getBottomUp(getRange(rangeList.flat()))
}

export const createGetColor = ({ COLOR_LIST }: ChartOptions) => (
  seriesId: number
): string => COLOR_LIST[seriesId % COLOR_LIST.length]
