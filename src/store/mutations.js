// ALL MUTATIONS
import * as types from './mutation-type'

export default {
    [types.SET_TITLE] (state,payload) {
        state.titleGroup.title  = payload.title;
        state.titleGroup.showIcon = payload.showIcon;
        state.titleGroup.icon   = payload.icon;
        state.titleGroup.link   = payload.link;
        //底部tab栏显示隐藏
        state.bottomTab.showBottomTab = payload.showBottomTab
    },

    [types.SET_USERINFO] (state, payload) {
        let data = payload.data[0]          //用户常用信息
        
        let userInfo = {
            uname: data.nickname || data.username || data.passport,
            score: data.score,
            uid: data.uid
        }
        state.token = payload.token         //token存储

        state.userInfo.uname = userInfo.uname
        state.userInfo.score = userInfo.score
        state.userInfo.uid = userInfo.uid
        
        state.token = userInfo.token
        sessionStorage.setItem('zd_access_token', JSON.stringify(state.token))
        sessionStorage.setItem('ZDKJ_USERINFO', JSON.stringify(userInfo))
    }
}

