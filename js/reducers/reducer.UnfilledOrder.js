import {
    UNFILLED_ORDER
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function UnfilledOrder (state = initialState,action){
    switch(action.type){
        case UNFILLED_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}