import { ChartOptions, CLChartOptions, ChartInput, Pair } from "./types.ts"
import { processCSV } from "./csv.ts"

export const replaceExtension = (fileName: string) => {
  try {
    const arr = fileName.split(".")
    const newFileName = [...arr.slice(0, -1), "svg"].join(".")
    if (newFileName === "svg" || newFileName === ".svg") {
      return `${fileName}.svg`
    }
    return newFileName
  } catch (err) {
    throw new Error("Please specify a correct input file name using -i flag")
  }
}

export const splitRange = (rangeInput?: string): Pair | undefined => {
  try {
    if (!rangeInput) {
      return undefined
    }
    if (!/^\d+(\.\.|\-)\d+$/.test(rangeInput)) {
      throw new Error()
    }
    const range = rangeInput.split(/\.\.|\-/).map((value) => +value)
    if (range[0] > range[1]) {
      throw new Error()
    }
    return range as Pair
  } catch (err) {
    throw new Error("Please specify a correct range, e.g.: -y MIN..MAX")
  }
}

export const combineOptions = ([userOptions, defaultOptions]: [
  CLChartOptions,
  ChartOptions
]): ChartOptions => ({
  ...defaultOptions,
  W: +(userOptions.W ?? userOptions.width ?? defaultOptions.W),
  H: +(userOptions.H ?? userOptions.height ?? defaultOptions.H),
  T: +(userOptions.T ?? userOptions["margin-top"] ?? defaultOptions.T),
  R: +(userOptions.R ?? userOptions["margin-right"] ?? defaultOptions.R),
  B: +(userOptions.B ?? userOptions["margin-bottom"] ?? defaultOptions.B),
  L: +(userOptions.L ?? userOptions["margin-left"] ?? defaultOptions.L),
  X_TICKS: +(userOptions.X ?? userOptions["x-ticks"] ?? defaultOptions.X_TICKS),
  Y_TICKS: +(userOptions.Y ?? userOptions["y-ticks"] ?? defaultOptions.Y_TICKS),
  FONT_SIZE: +(
    userOptions.F ??
    userOptions["font-size"] ??
    defaultOptions.FONT_SIZE
  ),
  CHART_BACKGROUND:
    userOptions["chart-background"] ?? defaultOptions.CHART_BACKGROUND,
  COLOR_LIST: [...userOptions._, ...defaultOptions.COLOR_LIST] as string[],
  Y_RANGE: splitRange(userOptions["y-range"] ?? userOptions.y),
})

export const decorateWithOptions = (chartOptions: ChartOptions) => (
  chartInput: ChartInput
): ChartInput & ChartOptions => ({ ...chartOptions, ...chartInput })

export function logInfo({
  csv,
  userOptions,
  defaultChartOptions,
}: {
  csv: string
  userOptions: CLChartOptions
  defaultChartOptions: ChartOptions
}) {
  console.log("DATA")
  console.table([processCSV(csv).headers, ...processCSV(csv).matrix])
  console.log("USER OPTIONS")
  console.table(
    (({ _, ...rest }) => ({ ...rest, COLOR_LIST: _.join(" ") || "Default" }))(
      userOptions
    )
  )
  console.log("OPTIONS")
  console.table(
    (({ COLOR_LIST, Y_RANGE, ...rest }) => ({
      ...rest,
      COLOR_LIST: COLOR_LIST.join(" "),
      Y_RANGE: Y_RANGE?.join("..") ?? "Auto",
    }))(combineOptions([userOptions, defaultChartOptions]))
  )
}
