import {
    RATE_ORDER
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function RateOrder (state = initialState,action){
    switch(action.type){
        case RATE_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}