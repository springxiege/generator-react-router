import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { 
    getPendingPayOrder,
    DeleteOrder,
    DeleteOrderCancel,
    DeleteOrderConfirm
} from '../actions/ActionFuncs'
class PendingPayOrder extends Component{
    componentDidMount() {
        document.title = '待支付订单' 
        this.serverRequest = $.ajax({
            url: config.url + '/orders/prepayment?pagesize=2&page=1',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getPendingPayOrder(data.data.data))
                    }else{
                        alert(data.data.msg)
                    }
                    
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    cancelOrder(e){
        let $order = $(e.target).closest('.main-module')
        let _ids = []
        $order.find('.part-list').each(function(index,item){
            _ids.push($(item).data('id'))
        })
        $.confirm({
            content:'取消订单后无法恢复',
            okBtn:function(){
                $.ajax({
                    url: config.url + '/orders/cancel',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _method:'delete',
                        ids:_ids
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        if(parseInt(data.code) === 0){
                            $order.remove();
                        }
                    }
                })
            }
        });
    }
    render(){
        let _HTML = '暂无待支付订单'
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                let orderNumber = "/SelectPay/" + item.snum
                return (
                   <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3><img src="images/3.jpg" alt="" />&ensp;&ensp;{item.shop_name} <span className="order-status fr">买家待付款</span></h3>
                            {item.items.map((subitem,subindex)=>{
                                let _link = '/ProductDetails/'+subitem.goods_id
                                _totalPrice += (subitem.preferential-0)
                                return (
                                    <div className="part-list" key={subindex} data-id={subitem.id}>
                                        <div className="part-info">
                                            <Link to={_link} className="clearfix">
                                                <img src={subitem.goods.goods_images[0]} alt="" className="fl" />
                                                <div className="part-detail">
                                                    <h4>{subitem.goods.title}</h4>
                                                    <p>{subitem.feature_main}&ensp;{subitem.feature_sub}</p>
                                                    <p>&yen;{subitem.goods_price} {/*<s>&yen;999.00</s>*/} <span className="fr">快递：{subitem.goods_postage}元</span></p>
                                                    <span>&times;{subitem.total_number}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>  
                                )
                            })}
                            
                            <div className="part-subtotal">
                                小计：<span>{_totalPrice}</span>元
                            </div>
                            <div className="part-funcs">
                                <span className="fr" ><Link to={orderNumber}>付款</Link></span>
                                <span className="fr" onClick={e=>this.cancelOrder(e)}>取消订单</span>
                            </div>
                        </div>
                    </div> 
                )
            })
        }
        return (
            <div>{_HTML}</div>
        )
    }
}
function select(state){
    return {state:state.PendingPayOrder};
}
export default connect(select)(PendingPayOrder);