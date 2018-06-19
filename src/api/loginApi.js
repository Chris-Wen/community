import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mook' : 'http://shop.73776.com/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

import qs from 'qs'

export function post(url, data) {
    return new Promise( (resolve, reject) => {
        // console.log(qs.stringify(data))
        axios.post( url, qs.stringify(data) ).then( response=>{
            resolve(response.data)
        }).catch( err => reject(err) )
    })
}


export function get(url, data) {
    return new Promise( (resolve, reject) => {
        axios.get( url, data).then(  response => {
            resolve(response.data)
        }).catch( err => reject(err) ) 
    })
}