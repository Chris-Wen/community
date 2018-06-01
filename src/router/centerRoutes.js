import Message from '@/views/common/center/Message'
import ToggleAccount from '@/views/common/center/ToggleAccount'
import Mark from '@/views/common/center/Mark'
import Repository from '@/views/common/center/Repository'
import Record from '@/views/common/center/Record'
import Recharge from '@/views/common/center/Recharge'
import Friend from '@/views/common/center/friend/Friend'
import FriendList from '@/views/common/center/friend/FriendList'
import FriendInfo from '@/views/common/center/friend/FriendInfo'



export const centerRoutes = [
    {
        path: '/center/msg',
        component:　Message
    },
    {
        path: '/center/friend', component: Friend,
        children: [
            {
                path:　'',
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
        component: ToggleAccount
    },
    {
        path: '/center/mark',
        component: Mark
    },
    {
        path: '/center/record',
        component: Record
    },
    {
        path: '/center/recharge',
        component: Recharge
    },
    {
        path: '/center/repository',
        component: Repository
    },
]   