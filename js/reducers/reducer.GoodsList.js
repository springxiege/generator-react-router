import {
    GOODSLIST,
    GET_MORE_GOODSLIST
} from '../actions/ActionTypes'
const initialState = {
    total:0,
    current_page:1,
    next_page_url:null,
    data:[]
}
export default function GoodsList(state=initialState,action){
    switch (action.type){
        case GOODSLIST:
            return Object.assign({},state,{
                data:action.data.data,
                total:action.data.total,
                current_page:action.data.current_page,
                next_page_url:action.data.next_page_url
            })
            break;
        case GET_MORE_GOODSLIST:
            return Object.assign({},state,{
                data:action.data.data
            })
            break;
        default:
            return state;
            break;
    }
}