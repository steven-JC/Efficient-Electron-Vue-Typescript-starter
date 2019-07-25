import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
Vue.use(Vuex)

const modules: { [key: string]: { [key: string]: any } } = {}

const _modules = require.context('./modules', true, /\.ts$/)

_modules.keys().forEach((item: string) => {
    const __module = _modules(item).default
    const path = item.split(/[\\\/]/g)
    const moduleName = path[path.length - 1].split(/\./g)[0]
    __module.namespaced = true
    modules[moduleName] = __module
})

console.log(`all modules`, modules)

export default new Vuex.Store({
    modules,
    plugins: [createPersistedState(), createSharedMutations()],
    strict: process.env.NODE_ENV !== 'production'
})
