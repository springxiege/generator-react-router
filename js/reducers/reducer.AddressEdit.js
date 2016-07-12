import {
    ADDRESS_EDIT,
    ADDRESS_EDIT_DEFAULT
} from '../actions/ActionTypes'
const initialState = {
    id:0,
    name:'',
    tel:'',
    address:'',
    is_default:0,
    buy_id:0
}
export default function AddressEdit(state=initialState,action){
    switch(action.type){
        case ADDRESS_EDIT:
            return Object.assign({},state,{
                id:action.data.id,
                name:action.data.name,
                tel:action.data.tel,
                address:action.data.address,
                is_default:action.data.is_default,
                buy_id:action.data.buy_id
            })
            break;
        case ADDRESS_EDIT_DEFAULT:
            return Object.assign({},state,{
                is_default:((parseInt(state.is_default)==1) ? 0 : 1)
            })
            break;
        default:
            return state;
            break;
    }
}