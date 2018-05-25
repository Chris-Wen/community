import ForumIndex from '@/views/forum/Index'
import ForumNews from '@/views/forum/News'
import ForumTopiclist from '@/views/forum/Topiclist'
import ForumActivities from '@/views/forum/Activities'
import GameIntro from '@/views/forum/Game'


export const forumRoutes = [
    {
        path: '/forum', component:　ForumIndex,
        children: [
            {
                path: '',
                component: ForumTopiclist
            },
            {
                path: 'news', 
                component: ForumNews
            },
            {
                path: 'activity',
                component: ForumActivities
            },
            {
                path: 'game',
                component: GameIntro
            }
        ]
    }
]