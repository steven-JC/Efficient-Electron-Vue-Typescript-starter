/**
 * 所有组件的基类
 */

import Widget from './Widget'
// 一些page通用的业务逻辑都可以在这里挂载

export default class Page extends Widget {
    // 路由hook会自动调用 showLoading，
    // 手动调用hideLoading，时机由程序逻辑控制
    // to dev...
    constructor() {
        super()
    }
}
