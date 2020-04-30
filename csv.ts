import { Matrix, ChartInput } from "./types.ts"

export const processCSV = (csv: string): ChartInput => {
  const [headersString, ...rows] = csv.split("\n").filter((line) => !!line)
  const headers = headersString.split(",")
  const matrix: Matrix = rows.map((row: string): string[] => row.split(","))
  return { headers, matrix }
}
