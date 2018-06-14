import axios from 'axios'

// axios.defaults.baseURL = 'http://shop.73776.com/index.php/home/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// import './api'
import qs from 'qs'

export function valiUserName(payload) {
    return new Promise( (resolve, reject) => {
        console.log(qs.stringify(payload))
        axios.post('/mook/login/checkRegisterName', qs.stringify(payload)).then( response=>{
            console.log(response.data)
            resolve(response.data)
        }).catch( err => reject(err) )
    })
}