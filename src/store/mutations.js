// ALL MUTATIONS
import * as types from './mutation-type'

//清除所有cookie函数
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

export default {
    [types.SET_TITLE] (state,payload) {
        state.titleGroup.title  = payload.title
        state.titleGroup.hideReturnIcon = payload.hideReturnIcon
        state.titleGroup.showIcon = payload.showIcon
        state.titleGroup.icon   = payload.icon
        state.titleGroup.link   = payload.link
        //底部tab栏显示隐藏
        state.bottomTab.showBottomTab = payload.showBottomTab
    },

    [types.SET_USERINFO] (state, payload) {
        let data = payload.data[0]          //用户常用信息
        
        let userInfo = {
            uname: data.nickname || data.username || data.passport,
            uid: data.uid,
            avatar: data.avatar
            // lottery_tickets: data.remain_times　
        }
        state.token = payload.token         //token存储
        state.score = data.score
        state.lottery_tickets = data.remain_times

        for (let index in userInfo) {
            state.userInfo[index] = userInfo[index]
        }

        if (payload.token && userInfo) {
            sessionStorage.setItem('zd_access_token', JSON.stringify(payload.token))
            sessionStorage.setItem('ZDKJ_USERINFO', JSON.stringify(userInfo))
        }
    },

    //设置发布目标板块
    [types.SET_EDITOR_TYPE] (state, payload) { state.editType = payload },


    //logout
    LOGOUT (state) {
        sessionStorage.clear()
        localStorage.clear()
        clearAllCookie()
        state.token = null;
        state.score = null;
        for (var i in state.userInfo) {
            state.userInfo[i] = null
        }
    },

    //个人中心ajax获取到的数据
    [types.SET_USERDATA] (state, payload) {
        state.score = payload.data.score
    },



}

