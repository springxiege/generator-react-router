'use strict';
import {combineReducers} from 'redux'

// 最新配置
import UserCenter from '../app/UserCenter/reducer'
import Messages from '../app/Messages/reducer'
import MyCollect from '../app/MyCollect/reducer'
import Settings from '../app/Settings/reducer'
import Address from '../app/Address/reducer'
import GoodsList from '../app/AllGoods/reducer'
import ShopCart from '../app/ShopCart/reducer'
import PendingPayOrder from '../app/Order/PendingPayOrder/reducer'
import UnfilledOrder from '../app/Order/UnfilledOrder/reducer'
import ReceiptOrder from '../app/Order/ReceiptOrder/reducer'
import ReturnOrder from '../app/Order/ReturnOrder/reducer'
import RateOrder from '../app/Order/RateOrder/reducer'
import OrderDetail from '../app/Order/OrderDetail/reducer'
import Tracking from '../app/Order/Tracking/reducer'
import BuyTempOrder from '../app/Buy/reducer'
import GoodsDetail from '../app/Product/reducer'
const trade = combineReducers({
    GoodsDetail:GoodsDetail,                    //商品详情页
    MyCollect:MyCollect,                        //收藏列表
    ShopCart:ShopCart,                          //购物车
    Address:Address,                            //地址库
    GoodsList:GoodsList,                        //全部宝贝列表
    BuyTempOrder:BuyTempOrder,                  //合并付款临时订单列表
    PendingPayOrder:PendingPayOrder,            //待支付订单
    UnfilledOrder:UnfilledOrder,                //未发货订单
    ReceiptOrder:ReceiptOrder,                  //已发货订单
    ReturnOrder:ReturnOrder,                    //退换货订单
    RateOrder:RateOrder,                        //待评价订单
    Tracking:Tracking,                          //售后跟踪信息
    Settings:Settings,                          //设置页面的用户信息
    UserCenter:UserCenter,                      //个人中心数据
    Messages:Messages,                          //我的消息
    OrderDetail:OrderDetail,                    //订单详情
})

export default trade
