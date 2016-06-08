'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
import MyCollect from './MyCollect'
// import CommentList from './CommentList'
// import GoodsSelectSku from './GoodsSelectSku'
// import SelectedSku from './SelectedSku'
const trade = combineReducers({
    GoodsDetail:GoodsDetail,
    MyCollect:MyCollect
    // CommentList:CommentList,
    // GoodsSelectSku:GoodsSelectSku,
    // SelectedSku:SelectedSku
})
export default trade
