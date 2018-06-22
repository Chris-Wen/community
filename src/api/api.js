import  axios  from './config'

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


