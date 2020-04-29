// @ts-ignore
import * as purity from "https://tatomyr.github.io/purity/core.js"
// @ts-ignore
import { registerAsync as registerAsyncUtil } from "https://tatomyr.github.io/purity/utils/register-async.js"
// @ts-ignore
import { delay as delayUtil } from "https://tatomyr.github.io/purity/utils/delay.js"

export const render: (
  strings: TemplateStringsArray,
  ...interpolations: any[]
) => string = purity.render

export type AnyAction = object & { type: string }

export type Dispatch<A extends AnyAction> = (action: A) => void

export type Component = (props?: object) => string

export type StateHandler<S, A extends AnyAction> = (
  state: S,
  action: A
) => Partial<S>

export type AsyncWatcher<S, A extends AnyAction> = (
  action: A,
  dispatch: Dispatch<A>,
  state: S
) => void

type Store<S, A extends AnyAction> = {
  mount: (component: Component) => void
  dispatch: Dispatch<A>
  connect: (component: Component) => Component
  rerender: () => void
  getState: () => S
}

export const createStore: <S, A extends AnyAction>(
  stateHandler?: StateHandler<S, A>,
  asyncWatcher?: AsyncWatcher<S, A>
) => Store<S, A> = purity.createStore

type AsyncHandler<S, A extends AnyAction> = (
  action: A,
  dispatch: Dispatch<A>,
  state: S
) => void

type RegisterAsync = <S, A extends AnyAction>(handlers: {
  [key: string]: AsyncHandler<S, A> // TODO: T in A.type ??
}) => (
  action: A,
  dispatch: Dispatch<A>,
  state: S,
  cb?: (action: A, state: S) => void
) => void

export const registerAsync: RegisterAsync = registerAsyncUtil

export const delay: (t: number) => Promise<void> = delayUtil
