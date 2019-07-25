# Efficient-Electron-Vue-Typescript-starter

> A starter with efficient structure for an Electron app using Webpack & Vuejs & Vuex & TypeScript.

## Start

## install & build

```bash
#
cnpm install
# serve with hot reload at localhost:9080
npm run dev
# or
yarn dev

# build by your os type
npm run build
# or
yarn build

# build .exe file of windows
yarn build:win

# build .app file of mac
yarn build:mac

```

# Introduction

## API modules

> the api modules would be required automatically.

@/api/modules/product.ts

```JavaScript
export default {
    getList: {
        url: '/path/path/getProductList',
        method: 'post',
        dataType: 'json',
        postJson: true
    }
}
// url:         path 路径 或 http 开头的完整路径
// method:      get/post/delete/put/jsonp     | 可选 默认 get
// dataType:    json/html/...                 | 可选 默认 json
// postJson:    post data as json             | 可选 默认 false
```

use as

```javascript
import API from '@/api'
(async (){
    const res = await API.product.getList({params})
}()
```

## modularized vuex

Working with `vuex-electron`: to share your Vuex Store between all processes

> the vuex modules would be required automatically.

all module would be set `namespace:true`

```javascript
export default {
    state: {...},
    getters: {...},
    mutations: {...},
    actions: {
        async login({ commit, state }: PlainObject, params: PlainObject) {
            console.log('login action')
        }
    }
}
```

## distributed route

> the route.ts files would be required automatically.

you don't need to have a router folder to manage the routes.
