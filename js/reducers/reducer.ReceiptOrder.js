import {
    RECEIPT_ORDER
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function ReceiptOrder (state = initialState,action){
    switch(action.type){
        case RECEIPT_ORDER:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}