
const  state = {
	author: 'Chris-Wen',
	titleGroup: {			//公共头部
		title: '',
		hideReturnIcon: false,	//返回按钮显隐
		showIcon: false,	//是否显示头部右侧图标	
		icon: '',  			//icon 
		link: ''			//跳转目标页
	},
	bottomTab: { showBottomTab: '' },
	token: null,
	userInfo: {
			uid: null,
			uname: '未登录',		
			score: null,
			uid: null,
			attents:　null,				//关注数量
			fans: null,					//粉丝
			lottery_tickets: null,
			avatar: '',
		},
	
	editType: 1,			//设置发帖目标板块  1：社区交流活动板块，  2：社区活动板块
}


export default state