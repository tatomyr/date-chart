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
  COLOR_LIST,
  CHART_BACKGROUND,
  SHEET_BACKGROUND,
  CHART_BORDER,
} from "./const.ts"
import { createTicks, createXLabel, createYLabel } from "./labels.ts"
import { Pair, Matrix } from "./types.ts"
import {
  transformToTime,
  createDataNormalizer,
  createGetSeries,
  createSeriesIdList,
} from "./svg-helpers.ts"

interface CreateSVGParams {
  headers: string[]
  matrix: Matrix
  yRange?: Pair
}

export const createSVG = ({
  headers,
  matrix,
  yRange = [0, 100],
}: CreateSVGParams) => {
  const seriesIdList = createSeriesIdList(headers)
  const dates = matrix.map(([value]: string[]) => transformToTime(value))
  const xRange: Pair = [Math.min(...dates), Math.max(...dates)]
  const getSeries = createGetSeries(matrix)
  const normalizeData = createDataNormalizer(xRange, yRange)
  const xLabel = createXLabel(xRange)
  const yLabel = createYLabel(yRange)

  return `
    <svg 
      viewBox="0 0 ${L + W + R} ${T + H + B}" 
      font-size="${FONT_SIZE}px"
      font-family="Calibri, 'Open Sans', sans-serif"
      class="canvas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        .canvas {
          transform: scale(1, -1);
          background: ${SHEET_BACKGROUND};
        }
        .box {
          fill: ${CHART_BACKGROUND};
          stroke: ${CHART_BORDER};
        }
        .points {
          fill: ${CHART_BACKGROUND};
        }
        .labels {
          transform: scale(1, -1);
        }
        .x-labels, .y-titles {
          text-anchor: middle;
        }
        .y-labels {
          text-anchor: end;
        }
      </style>
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
      <g class="labels x-labels" fill="${COLOR_LIST[0]}">
        ${createTicks(X_TICKS).map(xLabel)}
        ${xLabel({ index: X_TICKS, label: headers[0] })}
      </g>

      <!-- Y-Labels -->
      <g class="labels y-labels" fill="${COLOR_LIST[0]}">
        ${createTicks(Y_TICKS + 1).map(yLabel)}
      </g>
  
      <!-- Y-Titles -->
      <g class="labels y-titles">
        <text x="${L + W / 2}" y="${-(H + B + FONT_SIZE / 2)}">
          ${seriesIdList
            .map(
              (seriesId: number) => `
                <tspan fill="${COLOR_LIST[seriesId]}">${headers[seriesId]}</tspan>
              `
            )
            .join(" ")}
        </text>
      </g>

      <!-- Data (lines & points) -->
      ${seriesIdList.map(
        (seriesId: number) => `
          <polyline
            fill="none"
            stroke-width="1"
            points="${getSeries(seriesId).map(normalizeData).join(" ")}"
            stroke="${COLOR_LIST[seriesId]}"
          />
          <g class="data" >
            ${getSeries(seriesId)
              .map(normalizeData)
              .map(
                ([t, y]: Pair) => `
                  <circle 
                    cx="${t}" 
                    cy="${y}" 
                    r="2" 
                    stroke="${COLOR_LIST[seriesId]}" 
                    stroke-width="1" 
                    class="points" 
                  />
                `
              )}
          </g>
        `
      )}

    </svg>
  `
}
