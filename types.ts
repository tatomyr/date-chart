import { Args } from "https://deno.land/std/flags/mod.ts"

export type Pair = [number, number]

export type Matrix = string[][]

export type LabelProps = {
  index: number
  label?: string
}

export interface ChartInput {
  headers: string[]
  matrix: Matrix
  yRange?: Pair
}

export interface ChartOptions {
  W: number
  H: number
  T: number
  R: number
  B: number
  L: number
  X_TICKS: number
  Y_TICKS: number
  FONT_SIZE: number
  CHART_BACKGROUND: string
  CHART_BORDER: string
  SHEET_BACKGROUND: string
  COLOR_LIST: string[]
}

interface CLChartOptionsAll extends Args {
  width: string
  W: string
  height: string
  H: string
  "margin-top": string
  T: string
  "margin-right": string
  R: string
  "margin-bottom": string
  B: string
  "margin-left": string
  L: string
  "x-ticks": string
  X: string
  "y-ticks": string
  Y: string
  "font-size": string
  F: string
  "chart-background": string
  "chart-border": string
  "sheet-background": string
}

export type CLChartOptions = Partial<CLChartOptionsAll> & { _: string[] }

export interface CLArguments extends CLChartOptions {
  i: string
  o: string
}
