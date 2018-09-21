// Mutation 存在必须同步执行这个限制      所以采用 action，在action内部执行异步操作
import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mook' : '/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
import qs from 'qs'

import * as types from './mutation-type'

export default {
    handleTitle ({commit}, payload) { commit( types.SET_TITLE, payload) },

    login ({commit}, payload){				
        return new Promise((resolve, reject) => {    
            axios.post('/login/login', qs.stringify(payload) ).then( response => {
                let res = response.data
                if (res.code == 200) commit( types.SET_USERINFO, res)
                
                resolve(res) 
            }).catch( err =>  reject(err) )
        })
    },
    
    cookieLogin({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/login/cookie_login').then(  response => {
                let res = response.data

                if (res.code==200) commit( types.SET_USERINFO, res)

                resolve(res)
            }).catch( err => reject(err) )
        })
    },


    getUserData({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/member/getUserData').then( response => {
                let res = response.data

                if (res.code==200) commit(types.SET_USERDATA, res)

                resolve(res)
            }).catch( err => reject(err))
        })
    },


}


// export const getBanner = ({commit,state}, payload) => {
//     return new Promise((resolve, reject) => {
//         api.get('/getIndexInfo')
//             .then( response => {
//                 if (response.data.code==200) {
//                     state.indexInfo.indexBanner = response.data.banner
//                     state.indexInfo.hotSales = response.data.hotSales
//                 }
//                 resolve(response.data)
//             }).catch( err => reject(err) )
//     })
// }

// export const getList = ({commit, state}, payload) => {
//     return new Promise((resolve, reject) => {
//         api.get('/getgoods', {params: payload} )
//             .then( response => {
//                 if (response.data.code==200) {
//                     if (response.data.page==2) {
//                         state.listPage.list = response.data.list
//                         localStorage.setItem('_zdkj_goodslist', JSON.stringify(response.data.list))
//                     } else {
//                         state.listPage.list.push(response.data.list)
//                         localStorage.setItem('_zdkj_goodslist', JSON.stringify(state.listPage.list))
//                     }
//                 }
//                 resolve(response.data)
//             }).catch( err => reject(err) )
//     })
// }

// export const addCart = ({commit, state}, payload) => {
//     return new Promise((resolve, reject) => {
//         api.post('/addCart', qs.stringify(payload)) 
//             .then( response => {
//                 console.log(response)
//                 resolve(response.data.code)
//             }).catch( err => reject(err) )
//     })
// }

// export const commitDemand = ({commit, state}, payload) => {
//     return new Promise((resolve, reject) => {
//         api.post('/commitDemand', qs.stringify(payload))
//             .then( response => {
//                 console.log(response)
//                 resolve(response.data.code)
//             }).catch( err => reject(err) )
//     })
// }


// export const getCartList = ({commit, state}, payload) => {
//     return new Promise((resolve, reject) => {   
//         api.get('/getCart')
//             .then( response => {
//                 console.log(response);
//                 if (response.data.code == 200) {
//                     state.cartData = response.data.array
//                 }
//                 resolve(response.data.code)
//             }).catch( err => reject(err) )
//     })
// }