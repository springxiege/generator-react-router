import * as types from './action'
// 获取待支付订单
export function getPendingPayOrder(data){
    return {type:types.PENDING_PAY_ORDER,data}
}
// // 获取更多待支付订单
// export function getMorePendingPayOrder(data){
//     return {type:types.LOAD_MORE_PENDING_PAY_ORDER,data}
// }