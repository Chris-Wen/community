// api 封装

import  axios  from './config'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'
// http request 拦截器
//token验证登录机制
axios.interceptors.request.use(
    config => {
        // console.log(config)
        if (store.state.token) {
            config.headers.Authorization = `zdkj${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.response) {
            console.log(err.response)
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
    Indicator.open()

    return new Promise( (resolve, reject) => {
        axios.get( url, data).then(  response => {
            Indicator.close()

            resolve(response.data)
        }).catch( err => reject(err) ) 
    })
}


