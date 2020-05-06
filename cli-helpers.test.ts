import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import * as helpers from "./cli-helpers.ts"

const { test } = Deno

test("replaceExtension: replaces valid extension", function () {
  assertEquals(helpers.replaceExtension("test.csv"), "test.svg")
})
test("replaceExtension: adds svg extension in case of file name without an extension", function () {
  assertEquals(helpers.replaceExtension("test"), "test.svg")
})
test("replaceExtension: adds svg extension in case of combined file name without an extension", function () {
  assertEquals(helpers.replaceExtension("test.file."), "test.file.svg")
})
test("replaceExtension: adds svg extension in case of file name starts with dot and does not contain an extension", function () {
  assertEquals(helpers.replaceExtension(".test"), ".test.svg")
})
test("replaceExtension: replaces extension in case of file name starts with dot and contains an extension", function () {
  assertEquals(helpers.replaceExtension(".test.ext"), ".test.svg")
})
