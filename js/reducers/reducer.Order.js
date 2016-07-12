import {
    getPendingPayOrder,
    getUnfilledOrder,
    getReceiptOrder,
    getReturnOrder
} from '../actions/ActionTypes'
const initialState = {
    PendingPayOrder:[],

}
export default function Order (state = initialState,action){
    switch(action.type){
        case GO_TO_BUY:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}