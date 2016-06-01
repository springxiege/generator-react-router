'use strict';
import {combineReducers} from 'redux'

import todoCollect from './todoCollect'
console.log(todoCollect)
console.log(222333)
const trade = combineReducers({
    todoCollect
})
export default trade
