import * as types from './action'
// 获取退换货订单
export function getReturnOrder(data){
    return {type:types.RETURN_ORDER,data}
}