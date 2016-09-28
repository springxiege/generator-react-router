// 最新配置
import UserCenter from '../app/UserCenter/index'                  //个人中心
import MyCollect from '../app/MyCollect/index'                    //收藏列表
import Settings from '../app/Settings/index'                      //个人设置
import Messages from '../app/Messages/index'                      //消息中心
import AddressList from '../app/Address/index'                    //地址列表
import ModifyAddress from '../app/Address/ModifyAddress'          // 添加(编辑)地址
import AllGoods from '../app/AllGoods/index'                      //全部商品
import ShoppingCart from '../app/ShopCart/index'                  //购物车
import Order from '../app/Order/index'                            //订单列表
import PendingPayOrder from '../app/Order/PendingPayOrder/index'  //待付款订单
import UnfilledOrder from '../app/Order/UnfilledOrder/index'      //未发货订单
import ReceiptOrder from '../app/Order/ReceiptOrder/index'        //已发货订单
import ReturnOrder from '../app/Order/ReturnOrder/index'          //退换货
import RateOrder from '../app/Order/RateOrder/index'              //评价
import OrderDetail from '../app/Order/OrderDetail/index'          //订单详情
import Tracking from '../app/Order/Tracking/index'                //售后跟踪
import ReturnsReason from '../app/Order/Reasons'                  //退换货原因
import ParcelDetail from '../app/Order/ParcelDetail'              //物流查询
import Comment from '../app/Order/setComment'                     //评论
import Register from '../app/Register/index'                      //用户注册
import Protocol from '../app/Protocol/index'                      //服务协议
import BuyList from '../app/BuyBySku/index'                       //购买页面
import Buy from '../app/Buy/index'                                //合并付款页面
import PaySuccess from '../app/PayStatus/index'                   //支付后跳转成功或失败页面
import SelectPay from '../app/PaySelect/index'                    //支付选择页面
import ProductDetails from '../app/Product/index'                 //商品详情页
export default {
    component: 'div',
    path:'/',
    childRoutes: [{
        indexRoute:{
            component: ProductDetails
        }
    }, {
        path: "/UserCenter",
        component: UserCenter
    }, {
        path: "/Settings",
        component: Settings
    }, {
        path: "/Messages",
        component: Messages
    }, {
        path: "/allgoods/:userId",
        component: AllGoods
    }, {
        path: "/ShoppingCart",
        component: ShoppingCart
    }, {
        path: "/MyCollect",
        component: MyCollect
    }, {
        path: "/Address/:transfertype",
        component: AddressList
    }, {
        path: "/ModifyAddress/:transfertype(/:AddressId)",
        component: ModifyAddress
    }, {
        path: "/BuyList/:buyId", // buyId表示购买的临时id
        component: BuyList
    }, {
        path: "/Buy/:buyType", // buyType表示从哪里进入购买页面
        component: Buy
    }, {
        path: "/SelectPay/:orderNumber", //orderNumber表示生成的订单号
        component: SelectPay
    }, {
        path: "/PaySuccess/:payStatus", //payStatus表示支付成功的状态，0为失败，1为成功
        component: PaySuccess
    }, {
        path: "/ReturnsReason(/:orderId(/:type))",
        component: ReturnsReason
    }, {
        path: "/Tracking(/:orderId)",
        component: Tracking
    }, {
        path: "/ParcelDetail/:express/:parcel",
        component: ParcelDetail
    }, {
        path: "/Comment(/:orderId(/:Review))",
        component: Comment
    }, {
        path: "/Order",
        component: Order,
        indexRoute: {
            component: PendingPayOrder
        },
        childRoutes: [{
                path: "/PendingPayOrder",
                component: PendingPayOrder
            }, {
                path: "/UnfilledOrder",
                component: UnfilledOrder
            }, {
                path: "/ReceiptOrder",
                component: ReceiptOrder
            }, {
                path: "/RateOrder",
                component: RateOrder
            }, {
                path: "/ReturnOrder",
                component: ReturnOrder
            }

        ]
    }, {
        path: "/OrderDetail(/:orderId(/:ordertype))",
        component:OrderDetail
    }, {
        path: "/Register(/:page(/:id(/:type)))",
        component: Register
    }, {
        path: "/Protocol(/:page)",
        component: Protocol
    }, {
        path:'*',
        component: ProductDetails
    }]
}
