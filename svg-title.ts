import { Pair } from "./types.ts"

export const title = ([x, y]: Pair) => `
  <title>${new Date(x).toLocaleDateString()} : ${y}</title>
`
