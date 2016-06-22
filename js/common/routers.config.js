import ProductDetails from '../app/ProductDetails'
import UserCenter from '../app/UserCenter'
import AllGoods from '../app/AllGoods'
import ShoppingCart from '../app/ShoppingCart'
import MyCollect from '../app/MyCollect'
import AddressList from '../app/Address'
import AddressAdd from '../app/AddressAdd'
import AddressEdit from '../app/AddressEdit'
export default {
    component: 'div',
    childRoutes: [{
        path: "/",
        component: ProductDetails,
    },
    {
        path: "/ProductDetails/:DetailId",
        component: ProductDetails
    },
    {
        path: "/UserCenter",
        component: UserCenter
    },
    {
        path: "/allgoods",
        component: AllGoods
    },
    {
        path: "/ShoppingCart",
        component: ShoppingCart
    },
    {
        path: "/MyCollect",
        component: MyCollect
    },
    {
        path: "/Address",
        component: AddressList
    },
    {
        path: "/AddressEdit/:AddressId",
        component: AddressEdit
    },
    {
        path: "/AddressAdd",
        component: AddressAdd
    }]
}
