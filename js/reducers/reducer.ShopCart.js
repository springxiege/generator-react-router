import $ from 'jquery'
import { 
    SHOP_CART,
    DELETE_SHOP_GOODS,
    INCREMENT,
    DECREMENT,
    DELETE_CONFIRM,
    SELECT_SHOP_GOODS_SINGLE,
    SELECT_SHOP_GOODS_MULTIPLE
} from '../actions/ActionTypes'

let initialState = {
    pop:'pop-confirm Unask',
    delete_id:0,
    amount:{},
    totalAmount:0,
    checkedAll:false,
    data:[]
}
export default function ShopCart(state=initialState,action){
    let _amount = {},_totalAmount=0,currentAmount=0,_checkedAll=false;
    let GetTotalAmount = (data)=>{
        let _data = [],total=0;
        for (let i in data){
            let item = data[i]
            if(item.checked){
                _data.push(item.price*item.count+(item.fare-0))
            }
        }
        if(_data.length){
            _data.forEach((item)=>{
                total += (item-0)
            })
        }
        return total.toFixed(2)
    }
    switch (action.type) {
        case SHOP_CART:
            if(action.data.data.length){
                action.data.data.forEach((item,index)=>{
                    _amount[item.id] = {};
                    _amount[item.id].checked = false;
                    _amount[item.id].fare = item.goods.fare;
                    _amount[item.id].count = item.amount;
                    _amount[item.id].price = item.goods_addon.goods_price;
                    _amount[item.id].totalPrice = item.goods_addon.goods_price*item.amount + (_amount[item.id].fare-0)
                })
            }
            return Object.assign({},state,action.data,{
                amount:_amount
            })
            break;
        case DELETE_SHOP_GOODS:
            return Object.assign({},state,{
                pop:'pop-confirm ask',
                delete_id:action.id
            })
            break;
        case INCREMENT:
            currentAmount = state.amount[action.id].count
            currentAmount++;
            _amount = Object.assign({},state.amount);
            _amount[action.id].count = currentAmount;
            _amount[action.id].totalPrice = _amount[action.id].count*_amount[action.id].price + (_amount[action.id].fare-0)
            return Object.assign({},state,{
                amount:_amount,
                totalAmount:GetTotalAmount(_amount)
            })
            break;
        case DECREMENT:
            currentAmount = state.amount[action.id].count;
            currentAmount--
            _amount = Object.assign({},state.amount);
            _amount[action.id].count = currentAmount;
            _amount[action.id].totalPrice = _amount[action.id].count*_amount[action.id].price + (_amount[action.id].fare-0)
            return Object.assign({},state,{
                amount:_amount,
                totalAmount:GetTotalAmount(_amount)
            })
            break;
        case DELETE_CONFIRM:
            return Object.assign({},state,{
                totalAmount:GetTotalAmount(_amount)
            })
            break;
        case SELECT_SHOP_GOODS_SINGLE:
            _amount = Object.assign({},state.amount);
            _amount[action.id].checked = !_amount[action.id].checked;
            for(let i in _amount){
                let item = _amount[i]
                if(!item.checked){
                    _checkedAll = false;
                    break;
                }else{
                    _checkedAll = true;
                }
            }
            return Object.assign({},state,{
                amount:_amount,
                totalAmount:GetTotalAmount(_amount),
                checkedAll:_checkedAll
            })
            break;
        case SELECT_SHOP_GOODS_MULTIPLE:
            _amount = Object.assign({},state.amount);
            for(let i in _amount){
                let item = _amount[i]
                item.checked = action.checked
            }
            return Object.assign({},state,{
                amount:_amount,
                totalAmount:GetTotalAmount(_amount),
                checkedAll:action.checked
            })
            break;
        default:
            return state;
            break;
    }
}