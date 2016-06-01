/**
 * 商品收藏
 */
import { COLLECT } from '../actions/ActionTypes'
const initialState = {
    showstate:0
}
export default function todoCollect(state = initialState,action){
    switch (action.type) {
        case 'COLLECT':
            return {
                showstate:state.showstate + action.showstate
            }
            break;
        default:
        return state;
            break;
    }
}
