const getters = {
    showBottomTab (state) {
        return state.bottomTab.showBottomTab
    },
    
    titleGroup (state) {
        return state.titleGroup
    },
    
    userInfo (state) {
        return state.userInfo || JSON.parse(sessionStorage.getItem('ZDKJ_USERINFO'))

    },

    token (state) {
        return state.token || JSON.parse(sessionStorage.getItem('zd_access_token'))

    },
}

export default getters