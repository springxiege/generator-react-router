import $ from 'jquery'
import {
    GOODS_DETAIL,
    GOODS_SELECT_SKU,
    GOODS_SELECT_SKU_SUB,
    GOODS_SELECTED_SKU,
    SHOW_HIDE_SELECT_SKU,
    ADD_COLLECT,
    CANCEL_COLLECT,
    REFRESHRECOMMEND,
    INCREMENT,
    DECREMENT,
    GET_GOOD_COMMENT,
    GET_BAD_COMMENT
} from '../actions/ActionTypes'
import ProductDate from '../common/ProductDate'
// 处理数据分发到每个模块
// 收藏
const Collect = {
    status:0,
    clsName:'main-collect-icon fr'
}
const CommentList = {
    status:0,
    data:[
        [

        ],
        [

        ]
    ]
}
let _addon = []
for (let i = 0; i < ProductDate.goods_addon.length; i++) {
    let item = ProductDate.goods_addon[i].addon
    _addon[i] = item
}
let _originalprice = ProductDate.goods_addon[0].addon.length ? ProductDate.goods_addon[0].addon[0].goods_price :ProductDate.goods_addon[0].goods_price
const GoodsSelectSku = {
    count:1,
    isvisible:0,
    selected:0,
    subselected:0,
    price:_originalprice,
    originalprice:_originalprice,
    goods_addon:ProductDate.goods_addon,
    addon:_addon
}
const SelectedSku = {
    sku:"选择：规格分类"
}
const initialState = {
    Collect:Collect,
    CommentList:CommentList,
    GoodsSelectSku:GoodsSelectSku,
    SelectedSku:SelectedSku
}
export default function GoodsDetail(state=initialState,action){
    switch (action.type) {
        case GOODS_DETAIL:
            alert(1)
            break;
        case GOODS_SELECT_SKU:
            alert(2)
            break;
        case GOODS_SELECT_SKU_SUB:
            alert(3)
            break;
        case GOODS_SELECTED_SKU:
            return Object.assign({},state,{
                GoodsSelectSku:{

                }
            })
            break;
        case SHOW_HIDE_SELECT_SKU:
            return Object.assign({},state,{
                GoodsSelectSku:{
                    isvisible:!state.GoodsSelectSku.isvisible
                }
            })
            break;
        case ADD_COLLECT:
            console.log(state)
            return Object.assign({},state,{

            })
            break;
        case CANCEL_COLLECT:
            alert(7)
            break;
        case REFRESHRECOMMEND:
            alert(8)
            break;
        case INCREMENT:
            alert(9)
            break;
        case DECREMENT:
            alert(10)
            break;
        case GET_GOOD_COMMENT:
            alert(11)
            break;
        case GET_BAD_COMMENT:
            alert(12)
            break;
        default:
            return state;
            break;
    }
}
