const getters = {
    showBottomTab (state) {
        return state.bottomTab.showBottomTab
    },
    
    titleGroup (state) {
        return state.titleGroup
    },
    
    userInfo (state) {
        if (!state.userInfo.uid) {
            let userInfo = sessionStorage.getItem('ZDKJ_USERINFO')
            if (userInfo) {
                return JSON.parse(userInfo)
            }
        }
        return state.userInfo 
    },

    token (state) {
        return state.token || JSON.parse(sessionStorage.getItem('zd_access_token'))
    },


    score (state) {
        return state.score
    },


}

export default getters