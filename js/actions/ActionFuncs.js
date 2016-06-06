import * as types from '../actions/ActionTypes'
/**
 * 商品详情
 */
export function GoodsDetail(){
    return {type: types.GOODS_DETAIL}
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
/**
 * 商品sku选择器显隐
 */
export function ShowAndHideSelectSku(){
    return {type:types.SHOW_HIDE_SELECT_SKU}
}
/**
 * 刷新更换其他推荐商品
 */
export function RefreshRecommend(){
    return {type:types.REFRESHRECOMMEND};
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
/**
 * 数量增加
 */
export function Increment(){
    return {type:types.INCREMENT}
}
/**
 * 数量减少
 */
export function Decrement(){
    return {type:types.DECREMENT}
}
/**
 * 获取好评
 */
export function GetGoodComment(){
    return {type:types.GET_GOOD_COMMENT}
}
/**
 * 获取差评
 */
export function GetBadComment(){
    return {type:types.GET_BAD_COMMENT}
}
