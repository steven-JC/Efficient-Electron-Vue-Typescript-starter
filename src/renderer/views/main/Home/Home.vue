<template>
  <div id="home"
       class="home">
    Home
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Page from '@/common/Page'
@Component({
    components: {}
})
export default class Login extends Page {}
</script>
<style lang="stylus" scoped>
.home
  font-size 30px
</style>
