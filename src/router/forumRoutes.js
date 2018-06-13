import ForumIndex from '@/views/forum/Index'
import ForumNews from '@/views/forum/index/News'
import GameIntro from '@/views/forum/index/Game'
import ForumTopiclist from '@/views/forum/index/Topiclist'
import ForumActivities from '@/views/forum/index/Activities'

import ForumTopic from '@/views/forum/Topic'
import GameInfo from '@/views/forum/GameInfo'
import ForumArticle from '@/views/forum/Article'


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
        component: GameInfo
    },
    {
        path: '/forum/article',
        name: '论坛文章',
        component: ForumArticle
    },
    {
        path: '/forum/topic',
        name: '帖子详情',
        component: ForumTopic
    }
]