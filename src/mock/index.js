import Mock from 'mockjs';

// Mock.setup({
//     timeout: '350-600'
//  })
const Random = Mock.Random 
const postData = {
    "id": '@id(3, 10)',
    "nickname": '@name(0, 10)',
    'post_time': ~~(new Date().getTime()/1000) - Random.natural(0, 3600*24*5),
    'reply_num|0-100': 5,
    'title': '@ctitle(8, 20)',
    'uid|1-100': 10,
    'upload_image_num': '@natural(-1, 3)',
    'username': '@cname',
    'post_images|1-3' : [ '@image(375x250, @color, image)' ] 
}
const bannerData = {
    img: '@image(750x300, @color, BANNER IMAGE)',
    link: '@url()'
}
const novellistData = {
    author: '@cname',
    img: '@image(100x140, @color, novel)',
    name: '@ctitle(3, 10)',
    intro: '@ctitle(10, 200)',
    nid: '@id',
    state: '@natural(0, 3)',
    total_number: '@natural(10000)'
}
const activityData = {
    acid: '@id(1, 200)',
    activity: '@ctitle(8, 30)',
    creattime: ~~(new Date().getTime()/1000) - Random.natural(0, 3600*24*5),
    end_time: ~~(new Date().getTime()/1000) + Random.natural(0, 3600*24*10),
    initiator: 'XX科技',
    reply_num: '@natural(0, 500)',
    start_time: ~~(new Date().getTime()/1000) - Random.natural(0, 3600*24*3),
    type: '@natural(1,3)'
}

/**
 *  随机遍历数据，返回随机结果数组
 * @param {Number} size  循环遍历次数
 * @param {*}  initdata  需要随机的数据 
 * @return {Array}
 */
const generateData = ({size , initdata}) => new Array(size).fill().map(_ => initdata)


//登录相关
Mock.mock('/mock/login/cookie_login', 'get', {
    code: 200,
    msg: "login success",
    "token": '@string(lower, 15, 18)',
    data: [
        {
            "uid|1-10": 5,
            "username" : '@string()',
            "remain_times|1-10": 5,
            "nickname": '@name',
            "avatar": '@image(200x200, @color, avatar)'
        }
    ]
})
Mock.mock('/mock/login/login', 'post', {
    "code|1": [200, 401, 700],
    "msg": function() {
        var tip;
        switch (this.code) {
            case 200:   tip = "登录成功"
                break;
            case 401:   tip = "用户名或密码错误"
                break;
            case 700:   tip = "显示验证码"
                break;
            case 700:   tip = "显示验证码"
                break;
        }
    },
    "data": function() {
        return this.code == 200 ? {
            'avatar': Random.image('200x200', Random.color(), 'avatar'),
            'nickname': Random.name(),
            'passport': '',
            'remian_times': Random.natural(0, 10),
            'uid': Random.id(),
            'username': Random.cname()
        } : ""
    },
    'token': function() {
        return this.code == 200 ? Random.string("lower", 8, 15) : ''
    }
})



//转盘抽奖相关
Mock.mock('/mock/lottery/index', 'get', {
    code: "200",
    msg: 'success',
    data: {
        'remain_times|1-10': 5,
        'score|50-1000': 500,
        'lottery_total_times|50-300': 300,
        'prize_type|1-2': 1
    }
})

//抽奖结果
Mock.mock('/mock/lottery/getAwards', 'get', {
    code: '200',
    msg: 'success',
    data: {
        "add_score|0-100": 30,
        "logo": '@image(150x150, @color, 奖品)',
        "prize": '奖品名称',
        "prize_type|0-3": 1,
        "sort|1-10": 10 
    }
})


//-----------      个人中心页面
Mock.mock('/mock/member/index', 'get', {
    code: '200',
    msg: 'success',
    data: {
        "score|0-300": 100,
        "avatar": '@image(150x150, @color, avatar)',
        "nickname": '@name(3, 8)',
        "tip_summary": {
            "new_msg|0-10": 0
        }
    }
})
//签到页面
Mock.mock('/mock/member/dailySignShow', 'get', {
    code: 200,
    msg: 'succ',
    data: {
        serial_count: '@natural(0, 30)',
        sign_count: '@natural(0, 100)',
        sign_status: '@natural(0, 1)',
        sign_times: generateData({size: Random.natural(0, 10), initdata: '@now(yyyyMMdd)'})
    }
})

//--------------- 论坛相关

//论坛首页
Mock.mock(/^\/mock\/forum\/index/, 'get', {
    'code': '200',
    'msg': 'success',
    'totalPage|0-3': 0,
    'data': {
        "post": generateData({size: Random.natural(8, 20), initdata: postData}),
        "top_post": generateData({size: Random.natural(1, 2), initdata: postData}) 
    }
})
//社区活动
Mock.mock(/^\/mock\/forum\/activity/, 'get', {
    code: 200,
    msg: 'succ',
    data: {
        "posts": generateData({size: Random.natural(8, 20), initdata: postData}),
        "activity": generateData({size: Random.natural(3, 5), initdata: activityData})
    }
})
//帖子内容
Mock.mock(/^\/mock\/forum\/getPostInfo/, 'get', {
    code: 200,
    msg: 'success',
    data: {
        info: {
            "avatar": '@image(200x200, @color, @cname)',
            'content': '@cparagraph(1,5)',
            'id': '@id(3, 5)',
            'images': generateData({size: '@natural(0,5)', initdata: '@image(750x300, @color, Pretty Image)'}),
            'nickname': '@name(3, 8)',
            'post_time': ~~(new Date().getTime()/1000) - Random.natural(3600*2, 3600*24*10),
            'title': '@ctitle(8,30)',
            'uid': '@id(5, 10)',
            'username': '@cname()',
        },
        reply: generateData({size: Random.natural(0,35), initdata: {
            'avatar': '@image(200x200, @color, @cname)',
            'content': '@cparagraph(1, 6)',
            'nickname': '@name(4,8)',
            'pid': '@id(1, 5)',
            'reply_num': '@natural(1, 30)',
            'reply_time': ~~(new Date().getTime()/1000) - Random.natural(3600*10, 3600*24*6),
            'rid': '@id',
            'uid': '@natural',
            'username': '@cname',
            'second_reply_data': generateData({size: Random.natural(0, 6), initdata: {
                'content': '@csentence',
                'id': '@id',
                'nickname': '@name(1, 3)',
                'target_id': '@id',
                'target_uname': '@name',
                'uid': '@id',
                'username': '@cname'
            }})
        }})
    }
})


//------------------    小说相关
//小说首页
Mock.mock('/mock/novel/index', 'get', {
    'code': 200,
    'msg': 'success',
    data: {
        ad_list: generateData({size: Random.natural(2, 8), initdata: bannerData}),
        novel_list: {
            complete: generateData({size: Random.natural(3, 15), initdata: novellistData}),
            original: generateData({size: Random.natural(3, 15), initdata: novellistData}),
            rank: generateData({size: Random.natural(3, 15), initdata: novellistData}),
            relative: generateData({size: Random.natural(3, 15), initdata: novellistData})
        }
    }
})


//-----  商城首页
Mock.mock('/mock/mall/index', 'get', {
    code: 200,
    msg: 'succ',
    data: {
        banner: generateData({size: Random.natural(2, 8), initdata: bannerData})
    }
})





export default Mock