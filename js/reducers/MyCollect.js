/**
 * 商品收藏
 */
import { ADD_COLLECT,CANCEL_COLLECT } from '../actions/ActionTypes'
import CollectDate from '../common/CollectDate'

const initialState = CollectDate
export default function Collect(state = initialState,action){
    switch (action.type) {
        case ADD_COLLECT:
            return Object.assign({},state,{
                status:1,
                clsName:'main-collect-icon collected fr'
            })
            break;
        case CANCEL_COLLECT:
            return Object.assign({},state,{
                status:2,
                clsName:'main-collect-icon uncollected fr'
            })
        default:
        return state;
            break;
    }
}
