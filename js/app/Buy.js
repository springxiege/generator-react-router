import React,{Component} from 'react'
import {
    Link
} from 'react-router'
import {connect} from 'react-redux'
import {
    Address,
    GenerateTempOrders
} from '../actions/ActionFuncs'
import ButtonCenter from '../components/ButtonCenter'
class Buy extends Component{
    componentDidMount() {
        document.title = '合并付款'
        let _Address = this.props.state.Address.data
        if(_Address === null || _Address.length === 0){
            this.serverRequest = $.ajax({
                url: config.url + '/user/address',
                type: 'GET',
                dataType: 'json',
                data: {},
                beforeSend:(request)=>{
                    $.loading.show();
                    if(config.head!=''){
                        request.setRequestHeader("Authorization", "Bearer " + config.head);
                    }
                },
                error:(error)=>{
                    if(error.status === 401 && error.responseJSON.code === 1){
                        $.error('header请求错误，将重新请求');
                        $.refreshToken(function(){
                            window.location.reload();
                        })
                    }
                },
                success:(data)=>{
                    if(parseInt(data.code) == 0){
                        this.props.dispatch(Address(data.data));
                        $.loading.hide();
                    }
                }
            })
        }
        let _mapDate = []
        let _data   = this.props.state
        let _type   = this.props.params.buyType
        if(store.enabled){
            switch (_type){
                case 'buylist':
                    _mapDate = [{user:store.get('BuyUser'),list:store.get('BuyOrderList').data}]
                    break;
                case 'shopcart':
                    _mapDate = store.get('ShopCartList').data
                    break;
            }
        }else{
            alert('This browser does not supports localStorage')
        }
        this.props.dispatch(GenerateTempOrders(_mapDate))
    }
    componentWillUnmount() {
        let _Address = this.props.state.Address.data
        if(_Address === null || _Address.length === 0){
            this.serverRequest.abort();
        };
    }
    getOrder(e){
        let _type = this.props.params.buyType
        let _data = this.props.state.BuyTempOrder.data
        let _temp = []
        let _params = []
        let address = this.props.state.Address.data
        let addressId = 0
        $.each(_data, function(index, item) {
            $.each(item.list, function(subindex, subitem) {
                _temp.push(subitem)
            });
        });
        // console.log(_temp)
        $.each(_temp, function(index,item) {
            _params[index] = {}
            _params[index].goods_id = item.goods_id
            _params[index].addon_id = item.addon_id || item.goods_addon.id
            _params[index].amount = item.count
        });
        if(address && address.length){
            $.each(address, function(index, val) {
                if(val.selected == 1){
                    addressId = val.id
                }
            });
        }else{
            alert('请选择地址');
            return false;
        }
        
        $.ajax({
            url: config.url + '/goods/order',
            type: 'POST',
            dataType: 'json',
            data: {
                addressId:addressId,
                data:_params
            },
            beforeSend:(request)=>{
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                };
                $.loading.show();
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                $.loading.hide();
                if(parseInt(data.code) === 0){
                    store.remove('BuyTempOrder');
                    window.location.hash = '#/SelectPay/'+data.data.data.orderNumber
                }else{
                    $.error('错误代码:'+data.code+','+data.data.msg.msg);
                }
            }
        });
        
    }
    render(){
        let _data   = this.props.state
        let _address = _data.Address.data
        let defaultAddress = {}
        let _mapDate = _data.BuyTempOrder.data
        let _type   = this.props.params.buyType
        let _HTML = ''
        let _link = ''
        let _totalprice = 0
        if(_mapDate.length){
            switch (_type){
                case 'buylist': // 从购买页面进入 

                    _HTML = _mapDate.map((item,index)=>{
                        return (
                            <div className="part-item" key={index}>
                                <h3><img src={item.user.logo||'/images/shop_logo.gif'} alt="" />{item.user.realname||''}</h3>
                                <div className="part-list">
                                    {item.list.map((subitem,subindex)=>{
                                        _totalprice += ((subitem.price - 0)*(subitem.count - 0) + (subitem.fare-0))
                                        return(
                                            <div className="part-info clearfix" key={subindex}>
                                                <img src={subitem.images[0]||subitem.images[1]||subitem.images[2]} alt="" className="fl" />
                                                <div className="part-detail">
                                                    <h4>{subitem.title}</h4>
                                                    <p>{subitem.sku}</p>
                                                    <p>&yen;{subitem.price} <s>&yen;{subitem.originalprice}</s> <span className="fr">快递：{subitem.fare}元</span></p>
                                                    <span>&times;{subitem.count}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="part-subtotal">小计：<span>{`${_totalprice.toFixed(2)}`}</span>元</div>
                            </div>
                        )
                    })
                    _link = '/Address/buy'
                    break;
                case 'shopcart': //  
                    _HTML = _mapDate.map((item,index)=>{
                        return (
                            <div className="part-item" key={index}>
                                <h3><img src={item.user.logo} alt="" />{item.user.userName}</h3>
                                <div className="part-list">
                                    {item.list.map((subitem,subindex)=>{
                                        _totalprice += (parseFloat(subitem.price - 0)*(subitem.count - 0) + parseFloat(subitem.fare-0))
                                        return(
                                            <div className="part-info clearfix" key={subindex}>
                                                <img src={subitem.images} alt="" className="fl" />
                                                <div className="part-detail">
                                                    <h4>{subitem.title}</h4>
                                                    <p>{subitem.goods_addon.parent_addon.feature_main} {subitem.goods_addon.feature_sub}</p>
                                                    <p>&yen;{subitem.price} <s>&yen;{subitem.originalprice}</s> <span className="fr">快递：{subitem.fare}元</span></p>
                                                    <span>&times;{subitem.count}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="part-subtotal">小计：<span>{`${_totalprice.toFixed(2)}`}</span>元</div>
                            </div>
                        )
                    })
                    _link = '/Address/shopcart'
                    break;
                default:
                    break;
            }
        }else{
            if(_type == 'shopcart'){
                // window.location.hash = '#/ShoppingCart'
            }else{
                
            }
        }
        
        if(_address && _address.length){
            $.each(_address,function(index,item) {
                if(parseInt(item.selected) === 1){
                    defaultAddress.id         = item.id
                    defaultAddress.tel        = item.tel
                    defaultAddress.name       = item.name
                    defaultAddress.address    = item.address
                    defaultAddress.selected   = item.selected
                    defaultAddress.is_default = item.is_default
                    return false
                }
                if(parseInt(item.is_default) === 1){
                    defaultAddress.id         = item.id
                    defaultAddress.tel        = item.tel
                    defaultAddress.name       = item.name
                    defaultAddress.address    = item.address
                    defaultAddress.selected   = item.selected
                    defaultAddress.is_default = item.is_default
                    return true
                }
                if(parseInt(item.selected) != 1 && parseInt(item.is_default) != 1){
                    defaultAddress.id = 0
                }
            });
        }else{
            defaultAddress.id = 0
        }
        return (
            <div className="main">
                {defaultAddress.id == 0 ? (
                    <div className="part-address">
                        <p><span>未获取收货地址</span><Link to={_link} className="fr">选择(添加)收货地址</Link></p>
                    </div>
                ) : (
                    <div className="part-address" data-id={defaultAddress.id}>
                        <h2>收货人：{defaultAddress.name} <span className="fr">{defaultAddress.tel}</span></h2>
                        <p>收货地址：{defaultAddress.address}</p>
                        <p><Link to={_link} className="fr">修改收货地址</Link></p>
                    </div>
                )}
                <div className="main-module">
                {_HTML}
                </div>
                <footer className="cart-footer buy-footer clearfix">
                    <aside className="fl">
                        <p className="fr">合计：<span>{`${_totalprice.toFixed(2)}`}元</span></p>
                    </aside>
                    <a href="javascript:;" onClick={e=>this.getOrder(e)}>立即支付</a>
                </footer>
                <ButtonCenter />
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(Buy);