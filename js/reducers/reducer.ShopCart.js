import { 
    SHOP_CART,
    INCREMENT,
    DECREMENT,
    DELETE_CONFIRM,
    SELECT_SHOP_GOODS_SINGLE,
    SELECT_SHOP_GOODS_MULTIPLE
} from '../actions/ActionTypes'

let initialState = {
    amount:{},
    totalAmount:0,
    checkedAll:false,
    data:[]
}
export default function ShopCart(state=initialState,action){
    let _amount = {},_totalAmount=0,currentAmount=0,_checkedAll=false;
    // 计算总金额
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
    // 删除购物车商品更新数据
    let updateSateDate = (id) =>{
        let oldDate = state.data;
        let newDate=[];
        for (var i = 0; i < oldDate.length; i++) {
            let item = oldDate[i];
            if(parseInt(item.id) != parseInt(id)){
                newDate.push(item)
            }
        }
        return newDate;
    }
    // 更新删除后的check状态
    let updateAmount = (id) => {
        let _Amount = state.amount;
        delete _Amount[id];
        return _Amount;
    }
    switch (action.type) {
        // 初始化请求数据
        case SHOP_CART:
            if(action.data.data.length){
                action.data.data.forEach((item,index)=>{
                    _amount[item.id] = {};
                    _amount[item.id].checked = false;
                    _amount[item.id].fare = item.goods?item.goods.fare:0;
                    _amount[item.id].count = item.amount;
                    if(item.goods_addon){
                        _amount[item.id].price = item.goods_addon.goods_price;
                        _amount[item.id].totalPrice = item.goods_addon.goods_price*item.amount + (_amount[item.id].fare-0)
                    }else{
                        _amount[item.id].price = 0
                        _amount[item.id].totalPrice = 0
                    }
                    
                })
            }
            return Object.assign({},state,action.data,{
                amount:_amount,
                checkedAll:false
            })
            break;
        // 增加单个商品的购买数量
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
        // 减去单个商品的购买数量
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
        // 删除购物车商品
        case DELETE_CONFIRM:
            return Object.assign({},state,{
                amount:updateAmount(action.id),
                data:updateSateDate(action.id),
                totalAmount:GetTotalAmount(updateAmount(action.id))
            })
            break;
        // 选中单个购买商品
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
        // 购物车购买商品全部选中
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