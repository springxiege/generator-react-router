import {
    GOODSLIST,
    GET_MORE_GOODSLIST
} from './action'
const initialState = {
    total:0,
    current_page:1,
    next_page_url:null,
    data:[],
    userProfile:{
        shop_logo:null,
        shop_name:null
    }
}
export default function GoodsList(state=initialState,action){
    switch (action.type){
        case GOODSLIST:
            return Object.assign({},state,{
                data:action.data.data,
                total:action.data.total,
                current_page:action.data.current_page,
                next_page_url:action.data.next_page_url,
                userProfile:action.data.userProfile
            })
            break;
        case GET_MORE_GOODSLIST:
            return Object.assign({},state,{
                data:action.data
            })
            break;
        default:
            return state;
            break;
    }
}