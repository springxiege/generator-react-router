'use strict';
import {combineReducers} from 'redux'

import Collect from './Collect'
import CommentList from './CommentList'
import GoodsSelectSku from './GoodsSelectSku'
const trade = combineReducers({
    Collect:Collect,
    CommentList:CommentList,
    GoodsSelectSku:GoodsSelectSku
})
export default trade
