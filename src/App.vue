<template>
  <div id="app">
    <m-header></m-header>

    <router-view></router-view>

    <bottom-tab></bottom-tab>
  </div>
</template>

<script>
import MHeader from 'components/Header/Header'
import BottomTab from 'components/BottomTab/BottomTab'

export default {
  name: 'App',
  components: {
    MHeader,
    BottomTab
  }
}

</script>

<style>
#app {
  width: 100%;
  padding: 100px 0;
  box-sizing: border-box;
}

</style>
