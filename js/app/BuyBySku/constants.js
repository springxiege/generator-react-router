import * as types from './action'
/**
 * 立即购买
 */
export function gotoBuy(data){
    return {type:types.GO_TO_BUY,data}
}
export function BuySelectSku(data){
    return {type:types.GODDS_BUY_SKU,data}
}
export function BuySelectSubSku(data){
    return {type:types.GODDS_BUY_SKU_SUB,data}
}
export function BuyDecrement(index){
    return {type:types.MINUS_BUY,index}
}
export function BuyCountDecrement(index){
    return {type:types.BUY_COUNT_DECREMENT,index}
}
export function BuyIncrement(index){
    return {type:types.ADD_BUY,index}
}
export function BuyCountIncrement(index){
    return {type:types.BUY_COUNT_INCREMENT,index}
}