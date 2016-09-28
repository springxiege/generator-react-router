import {
    GET_USER_INFO,
    MODIFY_NICKNAME
} from '../actions/ActionTypes'
const initialState = {
    name:'获取中···',
    headimgurl:"http://s.51lianying.com/images/xds/trade/msg.png",
    country:"中国",
    content:"浙江",
    city:"杭州"
}
export default function getUserInfo(state=initialState,action){
    switch(action.type){
        case GET_USER_INFO:
            return Object.assign({},state,{
                name:action.data.name,
                headimgurl:action.data.headimgurl,
                country:action.data.country,
                content:action.data.content,
                city:action.data.city
            });
            break;
        case MODIFY_NICKNAME:
            return Object.assign({},state,{
                name:action.name
            })
        default :
            return state;
            break;
    }
}