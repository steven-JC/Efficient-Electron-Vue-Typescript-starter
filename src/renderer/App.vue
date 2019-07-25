<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Page from '@/common/Page'
import { namespace } from 'vuex-class'

import '@/style/base.styl'

const login = namespace('login')

@Component({
    components: {}
})
export default class App extends Page {
    @login.Action('login')
    toLogin

    public name: string = 'App'

    mounted() {
        console.log('mounted')
        this.toLogin()
    }
}
</script>

<style>
/* CSS */
</style>
