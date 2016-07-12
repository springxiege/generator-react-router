import {
    GENERATE_TEMP_BUYLIST
} from '../actions/ActionTypes'
const initialState = {
    data:[]
}
export default function BuyTempList (state = initialState,action){
    switch(action.type){
        case GENERATE_TEMP_BUYLIST:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}