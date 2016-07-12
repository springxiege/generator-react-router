import {
    GENERATE_TEMP_ORDERS
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function BuyTempOrder (state = initialState,action){
    switch(action.type){
        case GENERATE_TEMP_ORDERS:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}
