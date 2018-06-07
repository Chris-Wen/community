import FictionIndex from '@/views/fiction/Index'
import Original from '@/views/fiction/Original'
import Relative from '@/views/fiction/Relative'
import Rank from '@/views/fiction/Rank'
import Complete from '@/views/fiction/Complete'

import Recommend from '@/views/fiction/Recommend'
import Article from '@/views/fiction/Article'

export const fictionRoutes = [
    {
        path: '/fiction', component:　FictionIndex,
        children: [
            {
                path:　'',
                name: '原创',
                component: Original
            },
            {
                path: 'relative',
                name: '同人',
                component: Relative
            },
            {
                path: 'complete',
                name: '完结',
                component: Complete
            },
            {
                path: 'rank',
                name: '排行',
                component: Rank
            }
        ]
    },
    {
        path: '/fiction/recommend',
        component: Recommend
    },
    {
        path: '/fiction/article/:articleId',
        name: 'fiction-article',
        component: Article
    },
]