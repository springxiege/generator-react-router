import {
    RETURN_ORDER,
    LOAD_MORE_RETURN_ORDER
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function ReturnOrder (state = initialState,action){
    switch(action.type){
        case RETURN_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        case LOAD_MORE_RETURN_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
        default:
            return state;
            break;
    }
}