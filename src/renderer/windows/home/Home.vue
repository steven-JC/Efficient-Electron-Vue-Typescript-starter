<template>
  <div id="app">
    <TitleBar window="home"
              :is-maximizable="true"
              :is-closable="true"
              :is-minimizable="true">
      <template slot="content">
        <div class="title-bar-content"></div>
      </template>
    </TitleBar>
    <div>Home</div>
    <div>
      <a href="http://yun.to8to.com?eeess=1&ss=2"
         target="_blank">yun.to8to.com</a></div>
    <div>
      <a href="https://tumax/open?target=login&e=2&t=3"
         target="_blank">open login browser</a></div>
    <div>
      <a href="https://tumax/login?&e=2&t=3"
         target="_blank">login</a></div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Page from '@/common/Page'
import { namespace } from 'vuex-class'
import TitleBar from '@/components/TitleBar.vue'
import '@/style/base.styl'

const login = namespace('login')

@Component({
    components: { TitleBar }
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
