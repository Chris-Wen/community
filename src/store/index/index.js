import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'	
import * as mutations from './mutation-type'


Vue.use(Vuex)

const SOTRE_USERINFO = JSON.parse(sessionStorage.getItem('ZDKJ_USERINFO'))

  // 定义状态
const  state = {
	author: 'Chris-Wen',
	titleGroup: {			//公共头部
		title: '',
		showIcon: false,	//是否显示头部右侧图标	
		icon: '',  			//icon 
		link: ''			//跳转目标页
	},
	bottomTab: { showBottomTab: '' },
	userInfo: 
		{
			uname: SOTRE_USERINFO ? SOTRE_USERINFO.uname : '',
			score: SOTRE_USERINFO ? SOTRE_USERINFO.score : '',
			uid: SOTRE_USERINFO ? SOTRE_USERINFO.uid : '',
			attents:　SOTRE_USERINFO ? SOTRE_USERINFO.attents : '',				//关注数量
			fans: SOTRE_USERINFO ? SOTRE_USERINFO.fans : '',					//粉丝
		},
	indexInfo: {
		indexBanner: '',
		shortBanner: ''
	},
	listPage: {
		list: [],
		ruleList1: [],
		ruleList2: [],
		ruleList3: [],
		ruleList4: []
	},
	cartData: []
}

//store
const store =  new Vuex.Store({			
	state,
	mutations,
	actions
})


//导出到 vue 
export default store