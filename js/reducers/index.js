'use strict';
import {combineReducers} from 'redux'

import Collect from './Collect'
import CommentList from './CommentList'
import GoodsSelectSku from './GoodsSelectSku'
import SelectedSku from './SelectedSku'
const trade = combineReducers({
    Collect:Collect,
    CommentList:CommentList,
    GoodsSelectSku:GoodsSelectSku,
    SelectedSku:SelectedSku
})
export default trade
