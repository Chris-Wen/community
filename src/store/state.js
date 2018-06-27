const SOTRE_USERINFO = JSON.parse(sessionStorage.getItem('ZDKJ_USERINFO'))

const  state = {
	author: 'Chris-Wen',
	titleGroup: {			//公共头部
		title: '',
		showIcon: false,	//是否显示头部右侧图标	
		icon: '',  			//icon 
		link: ''			//跳转目标页
	},
	bottomTab: { showBottomTab: '' },
	token: true,
	userInfo: 
		{
			uname: SOTRE_USERINFO ? SOTRE_USERINFO.uname : '',		
			score: SOTRE_USERINFO ? SOTRE_USERINFO.score : '',
			uid: SOTRE_USERINFO ? SOTRE_USERINFO.uid : '',
			attents:　SOTRE_USERINFO ? SOTRE_USERINFO.attents : '',				//关注数量
			fans: SOTRE_USERINFO ? SOTRE_USERINFO.fans : '',					//粉丝
		},
}


export default state