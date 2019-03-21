// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import * as axios from 'api/api'
require('./mock/')
Vue.prototype.axios = axios

// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole  微信开发工具
// let vConsole = new VConsole() //

const DefaultLogo = require('common/images/icons/LOGO(1).png')
Vue.prototype.DefaultLogo = DefaultLogo
Vue.use(VueLazyload, {
  preload: 1.3,
  loading: DefaultLogo
})

Vue.config.productionTip = false

import fastclick from 'fastclick'
import 'lib-flexible'
import './common/js/reset'

Vue.use(Vuex)


import './common/css/self-icons.css'
import './common/css/reset.css'

fastclick.attach(document.body)

import { Indicator,Toast } from 'mint-ui'
window.Indicator = Indicator
window.Toast = Toast

/**全局变量 */
Vue.prototype.preSrc = 'http://221.123.178.232/smallgamesdk/Public/Uploads/'
Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? 'http://shop-test.73776.com' : ''
Vue.prototype.NON_ICON = require("./common/images/icons/none.jpg")
Vue.prototype.DefaultAvatar = require('./common/images/global/user.jpg')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
