import { parse } from "https://deno.land/std/flags/mod.ts"
import { pipe } from "./modules.ts"
import { CLArguments } from "./types.ts"
import { processCSV } from "./csv.ts"
import { createSVG } from "./svg.ts"
import {
  replaceExtension,
  decorateWithOptions,
  combineOptions,
} from "./cli-helpers.ts"
import { defaultChartOptions } from "./default-chart-options.ts"

try {
  const {
    i: inputFile,
    o: outputFile = replaceExtension(inputFile),
    ...userOptions
  } = parse(Deno.args) as CLArguments

  if (!inputFile) throw new Error("Please specify input file with -i flag")

  const csv = new TextDecoder("utf-8").decode(await Deno.readFile(inputFile))

  console.log("DATA")
  console.table([processCSV(csv).headers, ...processCSV(csv).matrix])
  console.log("USER OPTIONS")
  console.table(
    (({ _, ...rest }) => ({ ...rest, COLOR_LIST: _.join(" ") }))(userOptions)
  )
  console.log("OPTIONS")
  console.table(
    (({ COLOR_LIST, ...rest }) => ({
      ...rest,
      COLOR_LIST: COLOR_LIST.join(" "),
    }))(combineOptions([userOptions, defaultChartOptions]))
  )

  const img = pipe(
    processCSV,
    pipe(
      combineOptions,
      decorateWithOptions
    )([userOptions, defaultChartOptions]),
    createSVG
  )(csv)
  await Deno.writeFile(outputFile, new TextEncoder().encode(img))
  console.log(`Chart has been successfuly written into file ${outputFile}`)
} catch (err) {
  console.error(err)
}
