import ShopIndex from '@/views/shop/Index'
import ShopList from '@/views/shop/List'
import ShopDetails from '@/views/shop/Details'


export const shopRoutes = [
    {
        path: '/shop',
        component:　ShopIndex
    },
    {
        path: '/shop/list',
        component: ShopList
    },
    {
        path: '/shop/details/:pid',
        component: ShopDetails
    }
]