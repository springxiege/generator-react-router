import {
    GO_TO_BUY
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function BuyList (state = initialState,action){
    switch(action.type){
        case GO_TO_BUY:
            return Object.assign({},state,{

            })
            break;
        default:
            return state;
            break;
    }
}
