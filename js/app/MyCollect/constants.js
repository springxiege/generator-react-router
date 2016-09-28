import * as types from './action'
/**
 * 商品收藏列表
 */
export function getCollectList(data){
    return {type:types.COLLECT_LIST,data};
}

export function getMoreCollectList(data){
    return {type:types.GET_MORE_COLLECT_LIST,data}
}
/**
 * 商品收藏
 * id 即为收藏商品的id
 */
export function AddCollect(id){
    return {type:types.ADD_COLLECT,id}
}
/**
 * 取消商品收藏
 * id 即为收藏商品的id
 */
export function CancelCollect(id){
    return {type:types.CANCEL_COLLECT,id}
}