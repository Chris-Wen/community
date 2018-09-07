import Message from '@/views/common/center/Message'
import ToggleAccount from '@/views/common/center/ToggleAccount'
import Mark from '@/views/common/center/Mark'
import Repository from '@/views/common/center/Repository'
import Record from '@/views/common/center/Record'
import Recharge from '@/views/common/center/Recharge'
import Friend from '@/views/common/center/friend/Friend'
import FriendList from '@/views/common/center/friend/FriendList'
import FriendInfo from '@/views/common/center/friend/FriendInfo'


import DrawRecord from '@/views/common/draw/Record'



export const centerRoutes = [
    {
        path: '/center/msg',
        name: '消息',
        meta: { requireAuth: true },
        component:　Message
    },
    {
        path: '/center/friend', component: Friend,
        children: [
            {
                path:　'',
                meta: { requireAuth: true },
                component: FriendList
            },
            {
                path: 'info',
                component: FriendInfo
            }
        ]
    },
    {
        path: '/center/account',
        name:　'账号切换',
        meta: { requireAuth: true },
        component: ToggleAccount
    },
    {
        path: '/center/mark',
        name: '我的收藏/帖子',
        meta: { requireAuth: true },
        component: Mark
    },
    {
        path: '/center/record',
        name: '签到',
        meta: { requireAuth: true },
        component: Record
    },
    {
        path: '/center/recharge',
        name: '充值',
        meta: { requireAuth: true },
        component: Recharge
    },
    {
        path: '/center/repository',
        name: '仓库',
        meta: { requireAuth: true },
        component: Repository
    },

    {
        path: '/draw/record',
        name: '中奖记录',
        component: DrawRecord
    },
]   