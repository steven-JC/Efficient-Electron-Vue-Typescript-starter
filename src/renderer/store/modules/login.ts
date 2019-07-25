export default {
    state: {
        forgot: {
            phoneNumbers: '',
            smsVerifyCode: ''
        },
        autoLogin: false
    },
    getters: {},
    mutations: {
        setAutoLogin(state: PlainObject, flag: boolean) {
            state.autoLogin = flag
        }
    },
    actions: {
        // 用户名+密码登录
        async login({ commit, state }: PlainObject, params: PlainObject) {
            console.log('login action')
        }
    }
}
