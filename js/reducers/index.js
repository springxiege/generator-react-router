'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './reducer.GoodsDetail'
import MyCollect from './reducer.MyCollect'
import ShopCart from './reducer.ShopCart'
import Address from './reducer.Address'
// import AddressEdit from './reducer.AddressEdit'
// import ReturnAddress from './reducer.ReturnAddress'
// import ReturnAddressEdit from './reducer.ReturnAddressEdit'
import GoodsList from './reducer.GoodsList'
import BuyTempOrder from './reducer.BuyTempOrder'
import PendingPayOrder from './reducer.PendingPayOrder'
import UnfilledOrder from './reducer.UnfilledOrder'
import ReceiptOrder from './reducer.ReceiptOrder'
import ReturnOrder from './reducer.ReturnOrder'
import RateOrder from './reducer.RateOrder'
import Tracking from './reducer.Tracking'
import Settings from './reducer.Settings'
import UserCenter from './reducer.UserCenter'
import Messages from './reducer.Messages'
import OrderDetail from './reducer.OrderDetail'

const trade = combineReducers({
    GoodsDetail:GoodsDetail,                    //商品详情页
    MyCollect:MyCollect,                        //收藏列表
    ShopCart:ShopCart,                          //购物车
    Address:Address,                            //地址库
    // AddressEdit:AddressEdit,                    //编辑地址
    // ReturnAddress:ReturnAddress,                //退换货地址库
    // ReturnAddressEdit:ReturnAddressEdit,        //退换货地址编辑
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
