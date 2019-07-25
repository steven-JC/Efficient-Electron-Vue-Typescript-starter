/**
 * For module import or split code use require
 */

interface NodeRequire {
    ensure(
        paths: string[],
        callback: (require: Function) => void,
        chunkName?: string
    ): void
    ensure(
        paths: string[],
        callback: (require: Function) => void,
        errorCallback?: (err: object) => void,
        chunkName?: string
    ): void
    context(path: string, exp: boolean, reg: RegExp): requireContext
}

interface requireContext {
    (path: string): { default: any }
    keys(): string[]
}

declare module 'qs'

declare interface Document {
    msHidden: string
    mozHidden: string
    webkitHidden: string
}

interface VueInstance {
    vm: { $el: Element }
    $mount: void
    $on: void
    $el: Element
    $store: PlainObject
    $electron: any
    $router: PlainObject
    $route: PlainObject
}

declare interface PlainObject {
    [key: string]: any
}

declare namespace State {
    // root state
    interface RootState {
        [key: string]: any
    }
}

declare namespace Action {
    export type Return = boolean | string | number | null | undefined
}
