import ShopIndex from '@/views/shop/Index'
import ShopList from '@/views/shop/List'
import ShopDetails from '@/views/shop/Details'
import ShopCart from '@/views/shop/Cart'
import ShopStrategy from '@/views/shop/Strategy'
import ManageAddress from '@/views/shop/ManageAddress'
import NewAddress from '@/views/shop/NewAddress'
import OrderConfirm from '@/views/shop/OrderConfirm'
import OrderInfo from '@/views/shop/OrderInfo'


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
    },
    {
        path: '/shop/cart',
        name: 'shopcart',
        meta: { requireAuth: true },
        component: ShopCart,
    },
    {
        path: '/shop/strategy',
        name: '积分攻略',
        component: ShopStrategy
    },
    {
        path: '/shop/address',
        name: 'address',
        meta: { requireAuth: true },
        component: ManageAddress
    },
    {
        path: '/shop/new_address',
        name: 'new_address',
        meta: { requireAuth: true },
        component: NewAddress
    },
    {
        path: '/order_confirm',
        name: 'order_confirm',
        meta: { requireAuth: true },
        component: OrderConfirm
    },
    {
        path: '/shop/order_info',
        name: 'order_info',
        meta: { requireAuth: false },
        component: OrderInfo
    },
]   