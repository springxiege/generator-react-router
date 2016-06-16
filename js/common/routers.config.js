import ProductDetails from '../app/ProductDetails.js';
import UserCenter from '../app/UserCenter.js';
import AllGoods from '../app/AllGoods.js';
import ShoppingCart from '../app/ShoppingCart.js';
import MyCollect from '../app/MyCollect.js';
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
    }]
}
