import * as types from '../actions/ActionTypes'
/**
 * 商品详情
 */
export function GoodsDetail(data){
    return {type: types.GOODS_DETAIL,data}
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
export function Increment(id){
    return {type:types.INCREMENT,id}
}
export function countIncrement(){
    return {type:types.COUNT_INCREMENT}
}
/**
 * 数量减少
 */
export function Decrement(id){
    return {type:types.DECREMENT,id}
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
 * 获取好评
 */
export function GetGoodComment(data){
    return {type:types.GET_GOOD_COMMENT,data}
}
/**
 * 获取差评
 */
export function GetBadComment(data){
    return {type:types.GET_BAD_COMMENT,data}
}

/**
 * 购物车列表
 */
export function ShopCart(data){
    return {type:types.SHOP_CART,data}
}
/**
 * 删除购物车商品
 */
export function DeleteCartGoods(id){
    return {type:types.DELETE_SHOP_GOODS,id}
}
/**
 * 取消删除
 */
export function DeleteCancel(){
    return {type:types.DELETE_CANCEL}
}
/**
 * 确认删除
 */
export function DeleteConfirm(){
    return {type:types.DELETE_CONFIRM}
}
/**
 * 选择商品（复选框）--> 单个商品
 */
export function SelectShopGoodsSingle(id){
    return {type:types.SELECT_SHOP_GOODS_SINGLE,id}
}
/**
 * 全选
 */
export function SelectShopGoodsMultiple(checked){
    return {type:types.SELECT_SHOP_GOODS_MULTIPLE,checked}
}