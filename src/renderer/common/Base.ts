/**
 * 所有组件的基类
 */
import { Vue } from 'vue-property-decorator'

// 一些component的通用非业务逻辑都可以在这里挂载

export default class Base extends Vue {
    protected readonly NODE_ENV = process.env.NODE_ENV
    public deepClone(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    protected getTimerByHour() {
        return (Date.now() - (Date.now() % 3600000)) / 100000
    }
}
