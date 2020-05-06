import { parse } from "https://deno.land/std/flags/mod.ts"
import { pipe } from "./modules.ts"
import { CLArguments } from "./types.ts"
import { processCSV } from "./csv.ts"
import { createSVG } from "./svg.ts"
import {
  replaceExtension,
  decorateWithOptions,
  combineOptions,
  logInfo,
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

  logInfo({ csv, userOptions, defaultChartOptions })

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
