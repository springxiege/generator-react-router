import * as types from './action'
// 获取确认收货订单
export function getReceiptOrder(data){
    return {type:types.RECEIPT_ORDER,data}
}