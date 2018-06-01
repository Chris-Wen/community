import FictionIndex from '@/views/fiction/Index'
import Original from '@/views/fiction/Original'
import Relative from '@/views/fiction/Relative'


export const fictionRoutes = [
    {
        path: '/fiction', component:　FictionIndex,
        children: [
            {
                path:　'',
                component: Original
            },
            {
                path: 'relative',
                component: Relative
            }
        ]
    }
]