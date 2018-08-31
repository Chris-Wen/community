/**
 * http 配置
 */

import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mook' : '/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'



export default axios