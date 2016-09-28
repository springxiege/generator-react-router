import {
    PENDING_PAY_ORDER,
    // LOAD_MORE_PENDING_PAY_ORDER
} from './action'
const initialState = {
    data:[]
}
export default function PendingPayOrder (state = initialState,action){
    switch(action.type){
        case PENDING_PAY_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        // case LOAD_MORE_PENDING_PAY_ORDER:
        //     return Object.assign({},state,{
        //         data:action.data
        //     })
        //     break;
        default:
            return state;
            break;
    }
}