import * as types from './action'
// 获取订单详情数据
export function getOrderDetail(data){
    return {type:types.ORDER_DETAIL,data}
}