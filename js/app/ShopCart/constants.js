import * as types from './action'
/**
 * 购物车列表
 */
export function ShopCart(data){
    return {type:types.SHOP_CART,data}
}
/**
 * 数量增加
 */
export function Increment(id){
    return {type:types.INCREMENT,id}
}
/**
 * 数量减少
 */
export function Decrement(id){
    return {type:types.DECREMENT,id}
}
/**
 * 删除购物车商品
 */
// export function DeleteCartGoods(id){
//     return {type:types.DELETE_SHOP_GOODS,id}
// }
/**
 * 确认删除
 */
export function DeleteConfirm(id){
    return {type:types.DELETE_CONFIRM,id}
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