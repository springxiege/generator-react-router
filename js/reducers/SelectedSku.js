import {GOODS_SELECTED_SKU} from '../actions/ActionTypes'
const initialState = {
    sku:'选择：规格分类'
}
export default function SelectedSku(state = initialState,action){
    switch (action.type) {
        case GOODS_SELECTED_SKU:
            console.log(action.data)
            let _data = action.data;
            let _sku = _data.goods_addon[_data.selected]['feature_main']
            let _sku_sub = _data.addon[_data.selected][_data.subselected]['feature_sub']
            let _allsku = _sku + _sku_sub
            return Object.assign({},state,{
                sku:_allsku
            })
            break;
        default:
        return state;
            break;
    }
}
