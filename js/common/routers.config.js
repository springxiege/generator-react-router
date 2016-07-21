import ProductDetails from '../app/ProductDetails'          //商品详情页
import UserCenter from '../app/UserCenter'                  //个人中心
import AllGoods from '../app/AllGoods'                      //全部商品
import ShoppingCart from '../app/ShoppingCart'              //购物车
import MyCollect from '../app/MyCollect'                    //收藏列表
import AddressList from '../app/Address'                    //地址列表
import AddressAdd from '../app/AddressAdd'                  //添加地址
import AddressEdit from '../app/AddressEdit'                //编辑地址
import ReturnAddress from '../app/ReturnAddress'            //退换货地址列表
import ReturnAddressAdd from '../app/ReturnAddressAdd'      //添加退换货地址
import ReturnAddressEdit from '../app/ReturnAddressEdit'    //编辑退换货地址
import Settings from '../app/Settings'                      //个人设置
import BindCashAccount from '../app/BindCashAccount'        //绑定银行卡
import BuyList from '../app/BuyList'                        //购买页面
import Buy from '../app/Buy'                                //合并付款页面
import SelectPay from '../app/SelectPay'                    //支付选择页面
import PaySuccess from '../app/PaySuccess'                  //支付后跳转成功或失败页面
import Order from '../app/Order'                            //订单列表
import PendingPayOrder from '../app/PendingPayOrder'        //待付款订单
import UnfilledOrder from '../app/UnfilledOrder'            //未发货订单
import ReceiptOrder from '../app/ReceiptOrder'              // 已发货订单
import ReturnOrder from '../app/ReturnOrder'                //退换货
import RateOrder from '../app/RateOrder'                    //评价
import Reason from '../app/Reason'                          //换货原因
import Back from '../app/Back'                              //退货原因
import Tracking from '../app/Tracking'                      //售后跟踪
import Comment from '../app/Comment'                        //售后跟踪
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
        path: "/allgoods/:userId",
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
        path: "/Address/:transfertype",
        component: AddressList
    },
    {
        path: "/AddressEdit/:type/:AddressId",
        component: AddressEdit
    },
    {
        path: "/AddressAdd/:transfertype",
        component: AddressAdd
    },
    {
        path:"/ReturnAddress",
        component:ReturnAddress
    },
    {
        path:"/ReturnAddressEdit/:ReturnAddressId",
        component:ReturnAddressEdit
    },
    {
        path: "/ReturnAddressAdd",
        component: ReturnAddressAdd
    },
    {
        path:"/Settings",
        component:Settings
    },
    {
        path:"/BuyList/:buyId", // buyId表示购买的临时id
        component:BuyList
    },
    {
        path:"/Buy/:buyType", // buyType表示从哪里进入购买页面
        component:Buy
    },
    {
        path:"/SelectPay/:orderNumber", //orderNumber表示生成的订单号
        component:SelectPay
    },
    {
        path:"/PaySuccess/:payStatus", //payStatus表示支付成功的状态，0为失败，1为成功
        component:PaySuccess
    },
    {
        path:"/Reason/:orderId",
        component:Reason
    },
    {
        path:"/Back/:orderId",
        component:Back
    },
    {
        path:"/Tracking/:orderId",
        component:Tracking
    },
    {
        path:"/Comment/:orderId",
        component:Comment
    },
    {
        path:"/Order",
        component:Order,
        indexRoute:{
            component:PendingPayOrder
        },
        childRoutes:[
            {
                path:"/PendingPayOrder",
                component:PendingPayOrder
            },
            {
                path:"/UnfilledOrder",
                component:UnfilledOrder
            },
            {
                path:"/ReceiptOrder",
                component:ReceiptOrder
            },
            {
                path:"/RateOrder",
                component:RateOrder
            },
            {
                path:"/ReturnOrder",
                component:ReturnOrder
            }

        ]
    },
    {
        path:"/BindCashAccount",
        component:BindCashAccount
    }]
}
