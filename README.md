# Date Chart

Creates a SVG date chart from CSV table like this:

| Date                         | Series 1 | Series 2 | ... |
| ---------------------------- | -------- | -------- | --- |
| Tue Apr 28 14:38:44 UTC 2020 | 76.67    | 66.42    | ... |
| ...                          | ...      | ...      | ... |

In order to create date chart run this command (you need [Deno](https://deno.land/) to be installed on your machine):

```bash
deno run --allow-read=. --allow-write=. --reload https://tatomyr.github.io/date-chart/cli.ts -i test-data.csv -o chart.svg
```

You can also use local script:

```bash
deno run --allow-read=. --allow-write=. cli.ts -i test-data.csv -o chart.svg
```

You have to specify an input file with `-i` flag.
Output file flag `-o` is optional (the script will automatically add _.svg_ extension).

Other available flags are:

| Flag             | Alias |
| ---------------- | ----- |
| width            | W     |
| height           | H     |
| margin-top       | T     |
| margin-right     | R     |
| margin-bottom    | B     |
| margin-left      | L     |
| x-ticks          | X     |
| y-ticks          | Y     |
| font-size        | F     |
| chart-background | -     |
| chart-border     | -     |
| sheet-background | -     |
| y-range          | y     |

The `y-range` should be supplied as two numbers separated by ellipsis (`..`) or a hyphen.

You may also specify a list of colors separated by comma right after the other flags to use them for series colouring.

# Testing

Run tests with `deno test`.
See more [here](https://deno.land/std/testing/).
