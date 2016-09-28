import * as types from './action'
/**
 * 商品详情
 */
export function GoodsDetail(data){
    return {type: types.GOODS_DETAIL,data}
}
/**
 * 商品收藏
 * id 即为收藏商品的id
 */
export function AddCollect(id){
    return {type:types.ADD_COLLECT,id}
}
/**
 * 商品sku选择器显隐
 */
export function ShowAndHideSelectSku(){
    return {type:types.SHOW_HIDE_SELECT_SKU}
}
/**
 * 商品sku
 */
export function GoodsSelectSku(index){
    return {type:types.GOODS_SELECT_SKU,index}
}
/**
 * 商品二级sku
 */
export function GoodsSelectSkuSub(index){
    return {type:types.GOODS_SELECT_SKU_SUB,index}
}
/**
 * 已选商品SKU
 */
export function GoodsSelectedSku(data){
    return {type:types.GOODS_SELECTED_SKU,data}
}
export function countIncrement(){
    return {type:types.COUNT_INCREMENT}
}
export function countDecrement(){
    return {type:types.COUNT_DECREMENT}
}
/**
 * 获取评论列表
 */
export function GetComment(data){
    return {type:types.GET_COMMENT,data}
}
/**
 * 立即购买
 */
export function gotoBuy(data){
    return {type:types.GO_TO_BUY,data}
}