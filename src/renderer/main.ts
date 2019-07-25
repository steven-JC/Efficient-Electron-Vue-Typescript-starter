import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Vuex)
Vue.use(Router)

import store from './store'

const _routes = require.context('./views', true, /\/route\.ts$/)
const names: string[] = []

const routes: RouteConfig[] = []

_routes.keys().forEach((item: string) => {
    const paths: string[] = item.split(/[\/\\]/g)
    const folderName = paths.slice(1, paths.length - 1).join('/')

    const routers: PlainObject = _routes(item).default
    Object.keys(routers).forEach((route: string) => {
        if (routers[route].name && names.indexOf(routers[route].name) > -1) {
            throw new Error(`路由模块已存在：${routers[route].name}`)
        }
        if (routers[route].name) {
            names.push(routers[route].name)
        }

        if (!routers[route].path) {
            routers[route].path =
                route === '/' ? `/${folderName}` : `/${folderName}/${route}`
        }
        routes.push(routers[route])
    })
})

const router: Router = new Router({
    routes,
    linkActiveClass: 'active'
})

console.log(`all routes`, routes)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

import App from './App.vue'

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
