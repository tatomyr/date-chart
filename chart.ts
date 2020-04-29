import { mount } from "./store/provider.js"
import {
  W,
  H,
  T,
  R,
  B,
  L,
  X_TICKS,
  Y_TICKS,
  FONT_SIZE,
  COLORS,
} from "./const.js"
import { createTicks, createXLabel, createYLabel } from "./labels.js"

let csv = `
Date,Statements,Branches,Functions,Lines,Debts

Mon Apr 13 14:06:20 UTC 2020,76.2%,65.78%,65.14%,76.42%,42
Wed Apr 15 12:34:22 UTC 2020,76.24%,65.93%,65.22%,76.44%,40
Thu Apr 16 15:05:57 UTC 2020,76.31%,66.03%,65.44%,76.52%,40
Fri Apr 17 14:55:35 UTC 2020,76.24%,66.03%,65.36%,76.45%,39
Tue Apr 21 12:56:26 UTC 2020,76.42%,66.25%,65.65%,76.62%,38
Mon Apr 27 20:18:24 UTC 2020,76.48%,66.24%,65.65%,76.68%,36
Tue Apr 28 08:03:38 UTC 2020,76.49%,66.2%,65.67%,76.69%,36
Tue Apr 28 14:38:44 UTC 2020,76.67%,66.42%,66.04%,76.88%,35

`

const [headersString, ...rows] = csv.split("\n").filter((line) => !!line)
const headers = headersString.split(",")

const matrix: string[][] = rows.map((row: string): string[] => row.split(","))

type Pair = [number, number]

const transformToTime = (str: string) => new Date(str).getTime()

const pair = (i: number) => (values: string[]): Pair => [
  transformToTime(values[0]),
  parseFloat(values[i]),
]

const getSeries = (col: number) =>
  matrix.reduce(
    ($: Pair[], values: string[]): Pair[] => [...$, pair(col)(values)],
    []
  )

const seriesList = Array.from(Array(headers.length - 1), (_, i) => i + 1)

const dates = matrix.map(([value]) => transformToTime(value))

const minT = Math.min(...dates)
const maxT = Math.max(...dates)

const createDataNormalizer = (
  [minT, maxT]: Pair,
  [minY, maxY]: Pair = [0, 100]
) => ([t, y]: Pair): Pair => [
  L + ((t - minT) / (maxT - minT)) * W,
  B + ((y - minY) / (maxY - minY)) * H,
]

const Y_RANGE: Pair = [0, 100]
const X_RANGE: Pair = [minT, maxT]

const normalizeData = createDataNormalizer(X_RANGE, Y_RANGE)

const xLabel = createXLabel(X_RANGE)
const yLabel = createYLabel(Y_RANGE)

export const createDateChart = () => `
  <div id="chart">
    <svg 
      viewBox="0 0 ${L + W + R} ${T + H + B}" 
      font-size="${FONT_SIZE}px"
      class="canvas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Box -->
      <rect 
        x="${L}" 
        y="${B}" 
        width="${W}" 
        height="${H}" 
        stroke-width="1" 
        class="box"
      />

      <!-- X-Labels -->
      <g class="labels x-labels" fill="${COLORS[0]}">
        ${createTicks(X_TICKS).map(xLabel)}
        ${xLabel({ index: X_TICKS, label: headers[0] })}
      </g>

      <!-- Y-Labels -->
      <g class="labels y-labels" fill="${COLORS[0]}">
        ${createTicks(Y_TICKS + 1).map(yLabel)}
      </g>
   
      <!-- Y-Titles -->
      <g class="labels y-titles">
        <text x="${L + W / 2}" y="${-(H + B + FONT_SIZE / 2)}">
          ${seriesList
            .map(
              (series) => `
                <tspan fill="${COLORS[series]}">${headers[series]}</tspan>
              `
            )
            .join(" ")}
        </text>
      </g>

      <!-- Data (lines & points) -->
      ${seriesList.map(
        (series) => `
          <polyline
            fill="none"
            stroke-width="1"
            points="${getSeries(series).map(normalizeData).join(" ")}"
            stroke="${COLORS[series]}"
          />
          <g class="data" >
            ${getSeries(series)
              .map(normalizeData)
              .map(
                ([t, y]) => `
                  <circle cx="${t}" cy="${y}" r="2"  stroke="${COLORS[series]}" stroke-width="1" class="points" />
                `
              )}
          </g>
        `
      )}

    </svg>
  </div>
`

mount(() => createDateChart(/* ... */))
