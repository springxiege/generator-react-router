import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { 
    getOrderDetail
} from '../actions/ActionFuncs'
class OrderDetail extends Component{
    componentDidMount(){
        this.serverRequest = $.ajax({
            url: config.url + '/orders/details/' + this.props.params.orderId,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:(request)=>{
                $.loading.show();
                if(config.head!=''){
                    request.setRequestHeader("token", config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code) === 0){
                    $.loading.hide();
                    this.props.dispatch(getOrderDetail(data.data))
                }
            }
        })
        
    }
    componentWillUnmount() {
        
    }
    doReturnOrder(e){
        let _ids = [this.props.state.id]
        $.confirm({
            titleclsName:'lytitle',
            title:'请选择退款理由',
            content:'<select name="reason" id="reason">'
                        +'<option value="七天无理由退货">七天无理由退货</option>'
                        +'<option value="不想要了">不想要了</option>'
                        +'<option value="卖家未按时间发货">卖家未按时间发货</option>'
                        +'<option value="冲动了，买错了">冲动了，买错了</option>'
                    +'</select>',
            okBtn:function(){
                var _reason = $('#reason').val();
                $.ajax({
                    url: config.url + '/orders/abandon',
                    type: 'POST',
                    headers:{
                        token:config.head
                    },
                    dataType: 'json',
                    data: {
                        _method:'PUT',
                        type:1,
                        abandon_reason:_reason,
                        ids:_ids
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        console.log(data)
                        if(parseInt(data.code) === 0){
                            $.error(data.data.msg,800,function(){
                                window.location.hash = '#/ReturnOrder'
                            })
                        }
                    }
                })
                
            }
        })
    }
    UpdateOrder(e){
        $.error('提醒发货成功')
    }
    render(){
        let _data = this.props.state.data
        return (
            <div className="main">
                <div className={parseInt(_data.parcel_status)===2?"orderheader finished":"orderheader"}>买家待收货</div>
                <div className="part-address">
                    <h2>收货人：{_data.purchaser||'...'}<span className="fr">{_data.purchaser_phone||1300000000}</span></h2>
                    <p>收货地址：{_data.purchaser_address||'...'}</p>
                </div>
                <div className="main-module">
                    <div className="part-item">
                        <h3>
                            <img src="images/3.jpg" alt="" />
                            &ensp;&ensp;王小二的时尚卖手 
                            <span className="order-status fr">买家待付款</span>
                        </h3>
                        <div className="part-list">
                            <div className="part-info clearfix">
                                <Link to={`/ProductDetails/${_data.goods_id}`}>
                                    <img src={"images/7.jpg"} alt="" className="fl" />
                                    <div className="part-detail">
                                        <h4>{_data.title}</h4>
                                        <p>{_data.feature_main} {_data.feature_sub}</p>
                                        <p>&yen;{_data.goods_price} {/*<s>&yen;999.00</s>*/} <span className="fr">快递：{_data.goods_postage}元</span></p>
                                        <span>&times;{_data.total_number}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="part-subtotal">实付：<span>{_data.preferential}</span>元</div>
                        <div className="ordernumber">
                            <p>订单编号：<span>20160726160211111</span></p>
                            <p>创建时间：<span>{_data.created_at}</span></p>
                            {/*<p>物流编号：<span>W1124154515415212</span></p>*/}
                        </div>
                        <div className="part-funcs">
                            {parseInt(_data.status) === 1 ? (
                                <span className="fr"><Link to={`/SelectPay/${_data.out_trade_no}`}>去付款</Link></span>
                            ) : ''}
                            {parseInt(_data.status) === 2 ? (
                                parseInt(_data.parcel_status) === 0 ? (
                                    <span className="fr" onClick={e=>this.doReturnOrder(e)}>退款</span>
                                ) : (
                                    parseInt(_data.parcel_status) === 1 ? (
                                        <span className="fr" onClick={e=>this.ConfirmOrder(e)}>确认收货</span>
                                    ) : (
                                        <span className="fr"><Link to={`/Comment/${_data.id}`}>评价</Link></span>
                                    )
                                )
                            ) : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state){
    return {state:state.OrderDetail};
}
export default connect(select)(OrderDetail);