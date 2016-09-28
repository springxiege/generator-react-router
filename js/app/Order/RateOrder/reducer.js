import {
    RATE_ORDER,
    // LOAD_MORE_RATE_ORDER
} from './action'
const initialState = {
    data:[],
    comment:[]
}
export default function RateOrder (state = initialState,action){
    switch(action.type){
        case RATE_ORDER:
            return Object.assign({},state,{
                data: action.data
            })
            break;
        // case LOAD_MORE_RATE_ORDER:
        //     return Object.assign({},state,{
        //         data: action.data
        //     })
        default:
            return state;
            break;
    }
}