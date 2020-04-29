import { pipe as pipeUtil } from "https://tatomyr.github.io/purity/utils/pipe.js"

type Fn = (x: any) => any
type Pipe = (...funcs: Fn[]) => Fn
export const pipe: Pipe = pipeUtil
