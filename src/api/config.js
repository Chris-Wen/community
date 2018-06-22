/**
 * http 配置
 */

import axios from 'axios'
import store from '../store/index/index'
import router from '../router/index'


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mook' : '/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log(config)
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


axios.interceptors.response.use(
    response => {
        console.log(response)
        return response
    },
    err => {
        console.log(3)
        if (err.response) {
            console.log(4)
            switch (err.response.status) {
                case 401:       //清除登录相关信息并跳转登录页面
                    store.commit(types.LOGOUT)
                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.path },
                    })

            }
        }
        return Promise.reject(err.response.data)
    },
)


export default axios