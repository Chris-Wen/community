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
        // console.log(store.getters.token)
        if (store.getters.token) {
            let str = randomString();
            
            config.headers.Authorization = `zdkj${store.getters.token}${str}`
            config.headers.Substr = str.length - 1;        //后台需要根据substr + 1 值截取Authorization获得token
            config.headers.TokenSize = str.length + 5;     //混淆字段 
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
            // console.log(err.response)
            switch (err.response.status) {
                case 401:  logout()     //清除登录相关信息并跳转登录页面
            }
        }
        // return Promise.reject(err.response.data)
        return Promise.reject(err)
    },
)

function logout() {
    store.commit('LOGOUT')
    // 只有在当前路由不是登录页面才跳转
    router.currentRoute.path !== 'login' &&
    router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.path },
    })
}


export function post(url, data) {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });

    return new Promise( (resolve, reject) => {
        axios.post( url, qs.stringify(data) ).then( response=>{
            Indicator.close()
            if (response.data.code==403) {

                let instance = Toast('身份验证失败，请重新登录');
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            } else if (response.data.code==405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            } 
            resolve(response.data)
            
        }).catch( err => reject(err) )
    })
}


export function get(url, data) {
    Indicator.open()

    return new Promise( (resolve, reject) => {
        axios.get( url, data).then(  response => {
            Indicator.close()
            if (response.data.code==403) {
                let instance = Toast('身份验证失败，请重新登录');
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            } else if (response.data.code==405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            }
            resolve(response.data)
        }).catch( err => reject(err) ) 
    })
}


export function upload(url, data) {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

    Indicator.open({
        text: '发布中...',
        spinnerType: 'fading-circle'
      });

    return new Promise( (resolve, reject) => {
        axios.post( url, data ).then( response=>{
            Indicator.close()
            if (response.data.code==403) {

                let instance = Toast('身份验证失败，请重新登录');
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            } else if (response.data.code==405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            }
            resolve(response.data)
        }).catch( err => reject(err) )
    })    

}



function randomString(len = Math.ceil(Math.random()*10)) {
    let arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','0','1','2','3','4','5','6','7','8','9'];
    let str = "";
    for (let i=0; i<len; i++) {
        str += arr[Math.round(Math.random()*arr.length)];
    }
    return str;
}