import { parse } from "https://deno.land/std/flags/mod.ts"
import { pipe } from "./modules.ts"
import { processCSV } from "./csv.ts"
import { createSVG } from "./svg.ts"
import { replaceExtension } from "./cli-helpers.ts"

try {
  const { i: inputFile, o: outputFile = replaceExtension(inputFile) } = parse(
    Deno.args
  )
  // TODO: implement other flags like --width/-W &c.
  if (!inputFile) throw new Error("Please specify input file with -i flag")

  const csv = new TextDecoder("utf-8").decode(await Deno.readFile(inputFile))
  console.table(processCSV(csv).matrix)

  const img = pipe(processCSV, createSVG)(csv)
  await Deno.writeFile(outputFile, new TextEncoder().encode(img))
  console.log(`Chart has been successfuly written into file ${outputFile}`)
} catch (err) {
  console.error(err)
}
