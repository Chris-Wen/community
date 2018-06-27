// api 封装

import  axios  from './config'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'
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



export function post(url, data) {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });

    return new Promise( (resolve, reject) => {
        axios.post( url, qs.stringify(data) ).then( response=>{
            Indicator.close()
            
            resolve(response.data)
        }).catch( err => reject(err) )
    })
}


export function get(url, data) {
    return new Promise( (resolve, reject) => {
        axios.get( url, data).then(  response => {
            console.log(response)
            resolve(response.data)
        }).catch( err => reject(err) ) 
    })
}


