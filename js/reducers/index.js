'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
import MyCollect from './MyCollect'
import ShopCart from './ShopCart'
import Address from './Address'
import AddressEdit from './AddressEdit'
import ReturnAddress from './ReturnAddress'
import ReturnAddressEdit from './ReturnAddressEdit'
import GoodsList from './GoodsList'
// import BuyList from './BuyList'

const trade = combineReducers({
    GoodsDetail:GoodsDetail,                    //商品详情页
    MyCollect:MyCollect,                        //收藏列表
    ShopCart:ShopCart,                          //购物车
    Address:Address,                            //地址库
    AddressEdit:AddressEdit,                    //编辑地址
    ReturnAddress:ReturnAddress,                //退换货地址库
    ReturnAddressEdit:ReturnAddressEdit,        //退换货地址编辑
    GoodsList:GoodsList,                        //全部宝贝列表
    // BuyList:BuyList                             //购买列表
})

export default trade
