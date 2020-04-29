# Date Chart

Creates a SVG date chart from CSV table like this:

| Date                         | Series 1 | Series 2 | ... |
| ---------------------------- | -------- | -------- | --- |
| Tue Apr 28 14:38:44 UTC 2020 | 76.67    | 66.42    | ... |
| ...                          | ...      | ...      | ... |

In order to create data chart run this command: 
```bash 
deno --allow-read=. --allow-write=. https://tatomyr.github.io/date-chart/cli.ts -i test-data.csv -o chart.svg
```

You can also use local script: 
```bash
deno --allow-read=. --allow-write=. cli.ts -i test-data.csv -o chart.svg
```

You have to specify an input file with `-i` flag.
Output file flag `-o` is optional (the script will automatically add _.svg_ extension).

# Testing

Run tests with `deno cli-helpers.test.ts`. See details [here](https://deno.land/std/testing/).