/**
 * 商品规格属性
 */
import { GOODS_SELECT_SKU } from '../actions/ActionTypes'
const initialState = {
    good_id:1,
    addon_id:1,
    count:1
}
export default function todoGoodsSelectSku(state = initialState,action){
    switch (action.type) {
        case 'GOODS_SELECT_SKU':
            return {
                id:action.data.id,
                addon_id:action.data.addon_id,
                count: action.data.count,
            }
            break;
        default:
        return state;
            break;
    }
}
