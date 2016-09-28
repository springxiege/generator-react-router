import * as types from './action'
/**
 * 生成临时订单
 */
export function GenerateTempOrders(data){
    return {type:types.GENERATE_TEMP_ORDERS,data}
}