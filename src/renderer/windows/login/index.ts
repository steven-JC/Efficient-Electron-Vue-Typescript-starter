import { Vue } from 'vue-property-decorator'
import Vuex from 'vuex'

Vue.use(Vuex)

import store from '@/store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

import App from './Login.vue'

new Vue({
    store,
    render: (h) => h(App)
}).$mount('#app')
