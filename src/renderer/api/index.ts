import { packageReq, setBaseHost } from './util'

const HOST =
    process.env.NODE_ENV === 'production'
        ? location.protocol + '//tumaxmerchant.to8to.com'
        : location.protocol + '//' + location.host

setBaseHost(HOST)

// 自动挂载模块
const modules: { [key: string]: { [key: string]: any } } = {}

const _modules = require.context('./modules', true, /\.ts$/)

_modules.keys().forEach((item: string) => {
    const _module = _modules(item).default
    const path = item.split(/[\\\/]/g)
    const moduleName = path[path.length - 1].split(/\./g)[0]
    modules[moduleName] = packageReq(_module, moduleName)
})

// console.log('api modules', modules)

export default Object.assign({}, modules)
