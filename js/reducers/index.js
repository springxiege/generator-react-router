'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
import MyCollect from './MyCollect'
import ShopCart from './ShopCart'
import Address from './Address'
import AddressEdit from './AddressEdit'

const trade = combineReducers({
    GoodsDetail:GoodsDetail,
    MyCollect:MyCollect,
    ShopCart:ShopCart,
    Address:Address,
    AddressEdit:AddressEdit
})

export default trade
