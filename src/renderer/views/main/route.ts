import Home from './Home/Home.vue'
export default {
    '/': {
        path: '/',
        redirect: { name: 'home' }
    },
    home: {
        name: 'home',
        component: Home
    }
}
