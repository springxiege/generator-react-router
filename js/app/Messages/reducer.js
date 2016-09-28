/**
 * 消息中心
 */
import {
    MESSAGES
} from "./action";
const initialState = {
    data:[]
}
export default function Messages(state = initialState,action){
    switch (action.type){
        case MESSAGES:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}