'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
import MyCollect from './MyCollect'
import ShopCart from './ShopCart'
import Address from './Address'
import AddressEdit from './AddressEdit'
import ReturnAddress from './ReturnAddress'
import ReturnAddressEdit from './ReturnAddressEdit'

const trade = combineReducers({
    GoodsDetail:GoodsDetail,
    MyCollect:MyCollect,
    ShopCart:ShopCart,
    Address:Address,
    AddressEdit:AddressEdit,
    ReturnAddress:ReturnAddress,
    ReturnAddressEdit:ReturnAddressEdit
})

export default trade
