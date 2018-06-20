// ALL MUTATIONS
export const handleTitle = (state,payload) => {
    state.titleGroup.title  = payload.title;
    state.titleGroup.showIcon = payload.showIcon;
    state.titleGroup.icon   = payload.icon;
    state.titleGroup.link   = payload.link;
    //底部tab栏显示隐藏
    state.bottomTab.showBottomTab = payload.showBottomTab
}

export const login = (state, payload) => {
    let userInfo = {
        uname: payload.nickname || payload.username || payload.passport,
        score: payload.score,
        uid: payload.uid
    }
    state.userInfo.uname = userInfo.uname
    state.userInfo.score = userInfo.score
    state.userInfo.uid = userInfo.uid
    
    sessionStorage.setItem('ZDKJ_USERINFO', JSON.stringify(userInfo))
}
