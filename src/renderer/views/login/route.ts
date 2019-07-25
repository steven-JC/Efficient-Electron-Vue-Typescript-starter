import PwdLogin from './PwdLogin/PwdLogin.vue'
export default {
    '/': {
        redirect: { name: 'pwdlogin' }
    },
    pwdlogin: {
        name: 'pwdlogin',
        component: PwdLogin
    }
}
