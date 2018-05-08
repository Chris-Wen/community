import ShopIndex from '@/views/shop/Index'
import ShopList from '@/views/shop/List'



export const shopRoutes = [
    {
        path: '/shop',
        component:　ShopIndex
    },
    {
        path: '/shop/list',
        component: ShopList
    }
]