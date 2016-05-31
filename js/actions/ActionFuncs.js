import * as types from '../action/ActionTypes'

export function doGoodsDetail (){
    return {type:types.GOODS_DETAIL}
}

export function doGoodsSelectSku(data) {
    return {type:types.GOODS_SELECT_SKU,data}
}
