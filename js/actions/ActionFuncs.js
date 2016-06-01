import * as types from '../actions/ActionTypes'

export function doTrade() {
    return {type:types.TRADE}
}

export function doGoodsDetail (){
    return {type:types.GOODS_DETAIL}
}
// 商品规格
export function doGoodsSelectSku(data) {
    return {type:types.GOODS_SELECT_SKU,data}
}
// 推荐
export function doRecommend(data){
    return {type:types.RECOMMEND,data}
}
/**
 * 商品收藏
 * data 即为传入的状态
 * data=>0 如果为0，则表示初始未收藏状态
 * data=>1 如果为1，则表示收藏状态
 * data=>2 如果为2，则表示收藏后取消收藏状态
 */
export function doCollect(data){
    return {type:types.COLLECT,showstate:data}
}

export function doIncrementCounter(state){
   return {tupe:types.INCREMENT,state}
}

export function doDecrementCounter(state){
  return {tupe:types.DECREMENT,state}
}
