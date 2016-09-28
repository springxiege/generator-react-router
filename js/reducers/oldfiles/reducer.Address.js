import {
    ADDRESS,
    ADDRESS_ADD,
    ADDRESS_EDIT,
    ADDRESS_DELETE,
    ADDRESS_SELECT,
    ADDRESS_DEFAULT,
    ADDRESS_DELETE_UPDATE
} from '../actions/ActionTypes'
const initialState = {
    initialAddress:0,
    initialId:0,
    edit:0,
    confirm:false,
    data:null
}
export default function Address(state=initialState,action){
    let _data = [],delete_id = 0;
    switch (action.type){
        case ADDRESS:
            _data = action.data
            for (let i = 0; i < _data.length; i++) {
            let item = _data[i]
            if(parseInt(item['is_default']) == 1){
                item['selected'] = 1
            }else{
                item['selected'] = 0
            }
        }
            return Object.assign({},state,{
                data:_data
            })
            break;
        case ADDRESS_DELETE:
            return Object.assign({},state,{
                confirm:!state.confirm,
                edit:action.data
            })
            break;
        case ADDRESS_SELECT:
            _data = state.data
            for (let i = 0; i < _data.length; i++) {
                let item = _data[i]
                if(parseInt(item.id) == parseInt(action.data)){
                    item.selected = 1
                }else{
                    item.selected = 0
                }
            }
            return Object.assign({},state,{
                data:_data
            })
            break;
        case ADDRESS_DEFAULT:
            _data = state.data
            for (let i = 0; i < _data.length; i++) {
                let item = _data[i]
                if(item.id == action.data){
                    item.is_default = 1
                }else{
                    item.is_default = 0
                }
            }
            return Object.assign({},state,{
                data:_data
            })
            break;
        case ADDRESS_DELETE_UPDATE:
            _data = state.data
            for (var i = 0; i < _data.length; i++) {
                let item = _data[i]
                if(item.id == action.data){
                    delete_id = i
                }
            }
            _data.splice(delete_id,1)
            return Object.assign({},state,{
                data:_data,
                confirm:!state.confirm
            })
            break;
        default :
            return state;
            break;
    }
}