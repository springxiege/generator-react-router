import {
    RETURN_ADDRESS_EDIT,
    RETURN_ADDRESS_EDIT_DEFAULT
} from '../actions/ActionTypes'
const initialState = {
    id:0,
    name:'',
    tel:'',
    address:'',
    buy_id:0
}
export default function ReturnAddressEdit(state=initialState,action){
    switch(action.type){
        case RETURN_ADDRESS_EDIT:
            return Object.assign({},state,{
                id:action.data.id,
                name:action.data.addressee,
                tel:action.data.tel,
                address:action.data.address,
                buy_id:action.data.buy_id
            })
            break;
        default:
            return state;
            break;
    }
}