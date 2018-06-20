import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mook' : '/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

import qs from 'qs'

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


