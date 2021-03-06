// import ShopIndex from '@/views/shop/Index'
import ShopList from '@/views/shop/List'
import ShopDetails from '@/views/shop/Details'
import ShopCart from '@/views/shop/Cart'
import ShopStrategy from '@/views/shop/Strategy'
import ManageAddress from '@/views/shop/ManageAddress'
// import NewAddress from '@/views/shop/NewAddress'
// import OrderConfirm from '@/views/shop/OrderConfirm'
import OrderInfo from '@/views/shop/OrderInfo'
import AddressList from '@/views/shop/AddressList'


export const shopRoutes = [
    {
        path: '/shop',
        component: () => import('@/views/shop/Index')
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
        path: '/shop/address_list',
        name: 'addressList',
        component: AddressList
    },
    {
        path: '/shop/new_address',
        name: 'new_address',
        meta: { requireAuth: true },
        component: () => import('@/views/shop/NewAddress')
    },
    {
        path: '/order_confirm',
        name: 'order_confirm',
        meta: { requireAuth: true },
        component: () => import('@/views/shop/OrderConfirm')
    },
    {
        path: '/shop/order_info',
        name: 'order_info',
        meta: { requireAuth: true },
        component: OrderInfo
    },
]   