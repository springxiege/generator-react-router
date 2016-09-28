import * as types from './action'
/**
 * 全部商品列表
 */
export function getGoodsList(data){
    return {type:types.GOODSLIST,data}
}

export function getMoreGoodsList(data){
    return {type:types.GET_MORE_GOODSLIST,data}
}