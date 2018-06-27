// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  preload: 1.3,
  loading: require('common/images/icons/LOGO(1).png')
})

Vue.config.productionTip = false

import fastclick from 'fastclick'
import 'lib-flexible'

Vue.use(Vuex)

import './common/js/reset'

import './common/css/self-icons.css'
import './common/css/reset.css'
import './common/css/global.css'
fastclick.attach(document.body)

import { Indicator,Toast } from 'mint-ui'
window.Indicator = Indicator
window.Toast = Toast



Vue.prototype.preSrc = 'http://221.123.178.232/smallgamesdk/Public/Uploads/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
