import axios from 'axios'
import qs from 'qs'

const utils = { getHeaders() {}, cookies: { delCookie() {} } }

const TEST_MODE = navigator.userAgent.indexOf('TEST_MODE') > -1

const Jsonp = require('jsonp')

let HOST = '//' + location.host

// !silent的处理方式
function handlerError(e: any) {
    // TuMessage({
    //     type: 'error',
    //     message:
    //         e.msg ||
    //         RequestErrorMsg[
    //             e.request && e.request.status
    //                 ? 'Status' + e.request.status
    //                 : 'Other'
    //         ]
    // })
}

export function setBaseHost(host) {
    HOST = host
}

export const headers = utils.getHeaders()

export const ax = axios.create({
    baseURL: HOST,
    timeout: 10000,
    responseType: 'json',
    transformRequest: [
        (data) => {
            if (data instanceof FormData) {
                return data
            }
            return qs.stringify(data)
        }
    ],
    paramsSerializer(params) {
        return qs.stringify(filterUndefinedParams(params))
    }
})
// http post method
export function postJson<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return axios
        .post(url, data, {
            params: TEST_MODE ? { _request_module_: module } : undefined,
            responseType: dataType,
            headers: utils.getHeaders()
        })
        .then((res) => {
            return preHandle(res, silent)
        })
}

// http get method
export function get<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return ax
        .get(url, {
            params: data,
            responseType: dataType,
            headers: utils.getHeaders()
        })
        .then((res) => {
            return preHandle(res, silent)
        })
}

// http post method
export function post<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return ax
        .post(url, data, {
            headers: utils.getHeaders(),
            responseType: dataType
        })
        .then((res) => {
            return preHandle(res, silent)
        })
}

// http post method
export function put<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return ax
        .put(url, data, {
            headers: utils.getHeaders(),
            responseType: dataType
        })
        .then((res) => {
            return preHandle(res, silent)
        })
}

// http delete method   ***delete***
export function Delete<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return ax
        .delete(url, {
            responseType: dataType,
            headers: utils.getHeaders(),
            params: data
        })
        .then((res) => {
            return preHandle(res, silent)
        })
}

export function jsonp<T>(
    url: string,
    data?: PlainObject,
    dataType?: string,
    silent?: boolean
): Promise<T> {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(data as object)
        const values = Object.values(data as object)
        const param: string[] = []
        for (let i = 0; i < keys.length; i++) {
            const str = keys[i] + '=' + values[i]
            param.push(str)
        }
        Jsonp(`${url}?${param.join('&')}`, null, (error, data) => {
            if (error) {
                console.error(error.message)
                reject('')
            } else {
                resolve(data)
            }
        })
    })
}

function preHandle(res: PlainObject, silent?: boolean) {
    const status = res.headers['api-status']
    if (!isNaN(status) && status === '0') {
        if (!silent) {
            handlerError({ msg: res.data && res.data.message })
        }
    }
    return res.data
}

export function packageReq(
    _module: {
        [key: string]: {
            url: string
            method?: string
            dataType?: string
            postJson?: boolean
        }
    },
    moduleName?: string
): { [key: string]: any } {
    const __module: { [key: string]: any } = {}
    let k: string
    for (k in _module) {
        if (_module[k]) {
            ;((name, req) => {
                let url: string
                if (!req.method) {
                    req.method = 'GET'
                }

                if (req.url.indexOf('http') === 0) {
                    url = req.url
                } else {
                    url = HOST + req.url
                }
                req.method = req.method.toUpperCase()
                if (!req.dataType) {
                    req.dataType = 'json'
                }
                if (!__module[name]) {
                    __module[name] = async (
                        data: PlainObject, // 请求参数
                        silent: boolean = false, // 设为true屏蔽默认请求出错提示
                        rejectMode: boolean = false // 设为true请求出错将会reject处理，默认 resolve({error:e})
                    ) => {
                        const allMethods: PlainObject = {
                            GET: get,
                            POST: post,
                            PUT: put,
                            DELETE: Delete,
                            JSONP: jsonp
                        }
                        const _method: any = req.postJson
                            ? postJson
                            : allMethods[req.method ? req.method : '']
                        if (!_method) {
                            throw `[DEV] undefined request method ${req.method}`
                        }
                        if (rejectMode) {
                            const res = await _method(
                                url,
                                data,
                                req.dataType,
                                silent
                            )
                            return res
                        } else {
                            let res: object
                            try {
                                res = await _method(
                                    url,
                                    data,
                                    req.dataType,
                                    silent
                                )
                            } catch (e) {
                                if (!silent) {
                                    handlerError(e)
                                }
                                res = { error: e }
                            }
                            return res
                        }
                    }
                }
            })(k, _module[k])
        }
    }
    return __module
}

function filterUndefinedParams(params: any): PlainObject {
    if (typeof params === 'object') {
        for (const x in params) {
            if (params.hasOwnProperty(x)) {
                if (typeof params[x] === 'undefined') {
                    delete params[x]
                }
            }
        }
    }
    return params
}
