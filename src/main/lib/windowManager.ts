import { BrowserWindow, ipcMain } from 'electron'
import Url from 'url'
import qs from 'qs'
//登录窗口最小化
const windowsConfig = require('../windows.config.json')

export default new (class WindowManager {
    public windows: { [target: string]: any } = {}
    constructor() {
        ipcMain.on('window.minimize', (win, target) => {
            this.windows[target].minimize()
        })
        ipcMain.on('window.maximize', (win, target) => {
            if (this.windows[target].isFullScreen()) {
                this.windows[target].setFullScreen(false)
            } else {
                this.windows[target].setFullScreen(true)
            }
        })
        ipcMain.on('window.close', (win, target) => {
            this.windows[target].close()
        })
    }
    open(target, options?: PlainObject | null) {
        console.log(`open(${target})`)
        if (!target || !windowsConfig[target]) {
            throw new Error(`no such window: ${target}`)
        }
        const queryStr = options ? '?' + qs.stringify(options) : ''
        const winURL =
            process.env.NODE_ENV === 'development'
                ? `http://localhost:9080/${target}.html` + queryStr
                : `file://${__dirname}/${target}.html` + queryStr
        const win = (this.windows[target] = new BrowserWindow(
            windowsConfig[target]
        ))
        win.loadURL(winURL)
        this.initWindow(target, win)
    }
    initWindow(target, win) {
        win.on('closed', () => {
            this.windows[target] = null
        })
        win.webContents.on(
            'new-window',
            (event, url, fname, disposition, options) => {
                const urlParsed = Url.parse(url)
                if (urlParsed.host !== 'tumax') {
                    if (!this.windows.browser) {
                        this.open('browser')
                    }
                    this.windows.browser.send('open-tab', url)
                    this.windows.browser.focus()
                } else {
                    const action = (urlParsed.pathname || '').substr(1)
                    let params
                    if (urlParsed.query) {
                        params = qs.parse(urlParsed.query)
                    }
                    console.log(urlParsed)
                    switch (action) {
                        case 'open':
                            if (!params || !params.target)
                                throw new Error('lack of target param')
                            if (this.windows[params.target]) {
                                this.windows[params.target].focus()
                            } else {
                                this.open(params.target, params)
                            }
                            break
                    }
                }
                event.preventDefault()
            }
        )
    }
})()
