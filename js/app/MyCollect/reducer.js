/**
 * 商品收藏
 */
import { 
    COLLECT_LIST,
    ADD_COLLECT,
    CANCEL_COLLECT,
    GET_MORE_COLLECT_LIST
} from './action'

const initialState = {
    data:{
        data:[]
    }
}

export default function Collect(state = initialState,action){
    let _data = {}
    switch (action.type) {
        case COLLECT_LIST:
            _data = Object.assign({},state.data,action.data)
            return Object.assign({},state,{
                data:_data
            })
            break;
        case GET_MORE_COLLECT_LIST:
            _data = Object.assign({},state.data,{
                data:action.data
            })
            return Object.assign({},state,{
                data:_data
            })
            break;
        case ADD_COLLECT:
            return Object.assign({},state,{
                status:1,
                clsName:'main-collect-icon collected fr'
            })
            break;
        case CANCEL_COLLECT:
            return Object.assign({},state,{
                status:2,
                clsName:'main-collect-icon uncollected fr'
            })
        default:
        return state;
            break;
    }
}
