import {
    TRACKING
} from './action'

const initialState = {
    data:{}
}

export default function Tracking (state=initialState,action){
    switch(action.type){
        case TRACKING:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default :
            return state;
            break;
    }
}