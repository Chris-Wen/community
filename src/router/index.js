import Vue from 'vue'
import Router from 'vue-router'

import Draw from '@/views/common/Draw'
import Center from '@/views/common/Center'
import Login from '@/views/common/Login'
import Register from '@/views/common/Register'

import { shopRoutes } from './shopRoutes.js'
import { fictionRoutes } from './fictionRoutes.js'
import { forumRoutes } from './forumRoutes.js'
import { centerRoutes } from './centerRoutes.js'

Vue.use(Router)


export default new Router({
  routes: [ 
    {
      path: '/',
      redirect: '/draw'
    },
    {
      path: '/draw',
      component: Draw
    },
    {
      path: '/center',
      component: Center
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    ...shopRoutes,
    ...fictionRoutes,
    ...forumRoutes,
    ...centerRoutes
  ]
})
