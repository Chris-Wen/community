const getters = {
    showBottomTab (state) {
        return state.bottomTab.showBottomTab
    },
    
    titleGroup (state) {
        return state.titleGroup
    },
    
    userInfo (state) {
        if (!state.userInfo.uid) {
            return JSON.parse(sessionStorage.getItem('ZDKJ_USERINFO'))
        }
        return state.userInfo 
    },

    token (state) {
        return state.token || JSON.parse(sessionStorage.getItem('zd_access_token'))
    },

}

export default getters