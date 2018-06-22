import Vue from 'vue'
import Router from 'vue-router'

import Draw from '@/views/common/Draw'
import Center from '@/views/common/Center'
import Login from '@/views/common/Login'
import Register from '@/views/common/Register'
import Editor from '@/components/Editor/Editor'

import { shopRoutes } from './shopRoutes.js'
import { fictionRoutes } from './fictionRoutes.js'
import { forumRoutes } from './forumRoutes.js'
import { centerRoutes } from './centerRoutes.js'


import store from '../store/index/index'

Vue.use(Router)

const routes = [ 
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
  {
    path: '/editor',
    name: 'editor',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Editor
  },
  ...shopRoutes,
  ...fictionRoutes,
  ...forumRoutes,
  ...centerRoutes
]

const router = new Router({
  // linkExactActiveClass: 'linkClickStyle',
  routes,
})


// 路由判断进行登录拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {      // 判断该路由是否需要登录权限
      if (store.state.token) {    // 通过vuex state获取当前的token是否存在
          next();
      } else {
          Toast({
            message: '您还未登录',
            position: 'middle',
            duration: 2000
          })
          setTimeout(() => {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }, 2000);
      }
  }
  else {
      next();
  }
})

export default router