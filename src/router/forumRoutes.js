import ForumIndex from '@/views/forum/Index'
import ForumNews from '@/views/forum/News'


export const forumRoutes = [
    {
        path: '/forum', component:　ForumIndex,
        children: [
            {
                path: 'news', 
                component: ForumNews
            },
        ]
    }
]