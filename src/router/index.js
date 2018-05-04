import Vue from 'vue'
import Router from 'vue-router'

import Draw from '@/views/common/Draw'
import Center from '@/views/common/Center'

import { shopRoutes } from './shopRoutes.js'
import { fictionRoutes } from './fictionRoutes.js'
import { forumRoutes } from './forumRoutes.js'


Vue.use(Router)


export default new Router({
  routes: [ 
    {
      path: '/',
      component: Draw
    },
    {
      path: '/draw',
      component: Draw
    },
    {
      path: '/center',
      component: Center
    },
    ...shopRoutes,
    ...fictionRoutes,
    ...forumRoutes
  ]
})
