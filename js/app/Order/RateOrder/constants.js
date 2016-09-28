import * as types from './action'
// 获取待评论订单
export function getRateOrder(data){
    return {type:types.RATE_ORDER,data}
}
// 获取更多待评论订单
// export function getMoreRateOrder(data){
//     return {type:types.LOAD_MORE_RATE_ORDER,data}
// }
// 获取订单评论
// export function getOrderComment(data){
//     return {type:types.ORDER_COMMENT,data}
// }