import { ChartOptions } from "./types.ts"

export const defaultChartOptions: ChartOptions = {
  W: 600, // Width
  H: 400, // Height
  T: 15, // Top margin
  R: 20, // Right margin
  B: 25, // Bottom margin
  L: 45, // Left margin
  X_TICKS: 5,
  Y_TICKS: 4,
  FONT_SIZE: 10,

  SHEET_BACKGROUND: "#f0fef0",
  CHART_BACKGROUND: "#fef0f1",
  CHART_BORDER: "pink",

  COLOR_LIST: ["grey", "red", "green", "orange", "purple", "lightblue"],
}

export const NORM = 1 // The other possible option could be 0.5
