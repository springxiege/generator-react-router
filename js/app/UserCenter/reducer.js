import {
    GET_USER_CENTER_INFO
} from './action'
const initialState = {
    data:{
        orderNumeric:undefined,
        userDetail:undefined
    }
}
export default function UserCenterInfo(state=initialState,action){
    switch(action.type){
        case GET_USER_CENTER_INFO:
            return Object.assign({},state,{
               data:action.data
            });
            break;
        default :
            return state;
            break;
    }
}