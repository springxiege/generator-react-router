'use strict';
import {combineReducers} from 'redux'

import GoodsDetail from './GoodsDetail'
// import Collect from './Collect'
// import CommentList from './CommentList'
// import GoodsSelectSku from './GoodsSelectSku'
// import SelectedSku from './SelectedSku'
const trade = combineReducers({
    GoodsDetail:GoodsDetail
    // Collect:Collect,
    // CommentList:CommentList,
    // GoodsSelectSku:GoodsSelectSku,
    // SelectedSku:SelectedSku
})
export default trade
