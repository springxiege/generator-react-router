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
 * 商品收藏列表
 */
export function getCollectList(data){
    return {type:types.COLLECT_LIST,data};
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
export function BuyIncrement(index){
    return {type:types.ADD_BUY,index}
}
export function BuyCountIncrement(index){
    return {type:types.BUY_COUNT_INCREMENT,index}
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
export function BuyDecrement(index){
    return {type:types.MINUS_BUY,index}
}
export function BuyCountDecrement(index){
    return {type:types.BUY_COUNT_DECREMENT,index}
}
/**
 * 立即购买
 */
export function gotoBuy(data){
    return {type:types.GO_TO_BUY,data}
}
export function BuySelectSku(data){
    return {type:types.GODDS_BUY_SKU,data}
}
export function BuySelectSubSku(data){
    return {type:types.GODDS_BUY_SKU_SUB,data}
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
/**
 * 地址库 [初始化数据]
 */
export function Address(data){
    return {type:types.ADDRESS,data}
}
/**
 * 添加地址
 */
export function AddressAdd(data){
    return {type:types.ADDRESS_ADD,data}
}
/**
 * 编辑地址
 */
export function EditAddress(data){
    return {type:types.ADDRESS_EDIT,data}
}
/**
 * 删除地址
 */
export function AddressDelete(data){
    return {type:types.ADDRESS_DELETE,data}
}
/**
 * 选择地址
 */
export function AddressSelect(data){
    return {type:types.ADDRESS_SELECT,data}
}
/**
 * 设为默认地址
 */
export function AddressDefault(data){
    return {type:types.ADDRESS_DEFAULT,data}
}
/**
 * 删除后更新数据
 */
export function AddressDeleteUpdate(data){
    return {type:types.ADDRESS_DELETE_UPDATE,data}
}
/**
 * 
 */
export function AddressEditDefault(data){
    return {type:types.ADDRESS_EDIT_DEFAULT,data}
}
/**
 * 退换货地址库 [初始化数据]
 */
export function ReturnAddress(data){
    return {type:types.RETURN_ADDRESS,data}
}
/**
 * 添加地址
 */
export function ReturnAddressAdd(data){
    return {type:types.RETURN_ADDRESS_ADD,data}
}
/**
 * 编辑地址
 */
export function ReturnEditAddress(data){
    return {type:types.RETURN_ADDRESS_EDIT,data}
}
/**
 * 删除地址
 */
export function ReturnAddressDelete(data){
    return {type:types.RETURN_ADDRESS_DELETE,data}
}
/**
 * 选择地址
 */
export function ReturnAddressSelect(data){
    return {type:types.RETURN_ADDRESS_SELECT,data}
}
/**
 * 设为默认地址
 */
export function ReturnAddressDefault(data){
    return {type:types.RETURN_ADDRESS_DEFAULT,data}
}
/**
 * 删除后更新数据
 */
export function ReturnAddressDeleteUpdate(data){
    return {type:types.RETURN_ADDRESS_DELETE_UPDATE,data}
}
/**
 * 
 */
export function ReturnAddressEditDefault(data){
    return {type:types.RETURN_ADDRESS_EDIT_DEFAULT,data}
}
/**
 * 全部商品列表
 */
export function getGoodsList(data){
    return {type:types.GOODSLIST,data}
}