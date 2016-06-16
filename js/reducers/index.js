'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
import MyCollect from './MyCollect'
import ShopCart from './ShopCart'

const trade = combineReducers({
    GoodsDetail:GoodsDetail,
    MyCollect:MyCollect,
    ShopCart:ShopCart
})

export default trade
