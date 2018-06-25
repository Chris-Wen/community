import ForumIndex from '@/views/forum/Index'
import ForumNews from '@/views/forum/index/News'
import GameIntro from '@/views/forum/index/Game'
import ForumTopiclist from '@/views/forum/index/Topiclist'
import ForumActivities from '@/views/forum/index/Activities'



export const forumRoutes = [
    {
        path: '/forum', component:　ForumIndex,
        children: [
            {
                path: '',
                component: ForumTopiclist
            },
            {
                path: 'activity',
                component: ForumActivities
            },
            {
                path: 'news', 
                component: ForumNews
            },
            {
                path: 'game',
                component: GameIntro
            }
        ]
    },
    {
        path: '/forum/game_info',
        component: () => import('@/views/forum/GameInfo')
    },
    {
        path: '/forum/article',
        name: '论坛文章',
        component: () => import('@/views/forum/Article')
    },
    {
        path: '/forum/topic',
        name: '帖子详情',
        component: () => import('@/views/forum/Topic')
    },
    {
        path: '/forum/comment',
        name: 'forum_comment_list',
        meta: { requireAuth: true },
        component: () => import('@/views/forum/Comment')
    }
]