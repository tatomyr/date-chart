import { ChartOptions, CLChartOptions, ChartInput } from "./types.ts"

export const replaceExtension = (fileName: string) => {
  const arr = fileName.split(".")
  const newFileName = [...arr.slice(0, -1), "svg"].join(".")
  if (newFileName === "svg" || newFileName === ".svg") return `${fileName}.svg`
  return newFileName
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
})

export const decorateWithOptions = (chartOptions: ChartOptions) => (
  chartInput: ChartInput
): ChartInput & ChartOptions => ({ ...chartOptions, ...chartInput })
