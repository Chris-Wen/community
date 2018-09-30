import Message from '@/views/common/center/Message'
import ToggleAccount from '@/views/common/center/ToggleAccount'
import Mark from '@/views/common/center/Mark'
import Repository from '@/views/common/center/Repository'
import Recharge from '@/views/common/center/Recharge'
import Friend from '@/views/common/center/friend/Friend'
import FriendList from '@/views/common/center/friend/FriendList'
import FriendInfo from '@/views/common/center/friend/FriendInfo'

import SettingIndex from '@/views/common/center/settings/Index'
import Personal from '@/views/common/center/settings/Personal'

import Security from '@/views/common/center/settings/security/Index'
import SecurityIndex from '@/views/common/center/settings/security/Security'
import SecurityMobile from '@/views/common/center/settings/security/Mobile'
import SecurityEmail from '@/views/common/center/settings/security/Email'
import SecurityPassword from '@/views/common/center/settings/security/Password'


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
        component: () => import('@/views/common/center/Record'),
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
        path: '/center/settings',
        name: '设置',
        component: SettingIndex
    },
    {
        path:　'/center/settings/personal',
        name: '个人资料',
        meta: { requireAuth: true },
        component: Personal
    },
    {
        path: '/center/settings/security',
        component: Security,
        children: [
            {
                path:　'',
                name: '安全中心',
                meta: { requireAuth: true },
                component: SecurityIndex
            },
            {
                path:　'mobile',
                name: '密保手机',
                meta: { requireAuth: true },
                component: SecurityMobile
            },
            {
                path:　'email',
                name: '密保邮箱',
                meta: { requireAuth: true },
                component: SecurityEmail
            },
            {
                path:　'pwd',
                name: '修改密码',
                meta: { requireAuth: true },
                component: SecurityPassword
            },
        ]
    },
    {
        path: '/draw/record',
        name: '中奖记录',
        component: DrawRecord
    },
]   