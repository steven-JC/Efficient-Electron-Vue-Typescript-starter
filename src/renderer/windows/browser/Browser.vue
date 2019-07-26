<template>
  <div id="app">
    <TitleBar window="browser"
              :is-maximizable="true"
              :is-closable="true"
              :is-minimizable="true">
      <template slot="content">
        <div class="title-bar-content"></div>
      </template>
    </TitleBar>
    <div>Browser</div>

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
