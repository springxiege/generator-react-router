import React,{Component} from 'react'
import {Link} from 'react-router'
import {findDOMNode} from 'react-dom'
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
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
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
                    type: 'PUT',
                    dataType: 'json',
                    data: {
                        type:1,
                        abandon_reason:_reason,
                        ids:_ids
                    },
                    beforeSend:(request)=>{
                        if(config.head!=''){
                            request.setRequestHeader("Authorization", "Bearer " + config.head);
                        }
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
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
    ConfirmOrder(e){
        let _id = $(findDOMNode(e.target)).data('id')
        let _ids = [_id]
        $.confirm({
            titleclsName:'lytitle',
            contentclsName:'lynote',
            title:'<p>我要联赢提示</p>',
            content:'<p>1.确认收货后将无法通过系统发起退换货;</p><p>2.请您再三确认收到的宝贝是否满意再确认收货</p>',
            time:5,
            okBtn:function(){
                $.ajax({
                    url: config.url + '/orders/parcel',
                    type: 'put',
                    dataType: 'json',
                    data: {
                        ids:_ids
                    },
                    beforeSend:(request)=>{
                        if(config.head!=''){
                            request.setRequestHeader("Authorization", "Bearer " + config.head);
                        }
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        // console.log(data)
                        if(parseInt(data.code) === 0){
                            $.error(data.data.msg)
                            window.location.hash = '#//RateOrder'
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
                            <img src={_data.shop.shop_logo||'/images/shop_logo.gif'} alt="" />
                            &ensp;&ensp;{_data.shop.shop_name} 
                            {_data.is_abandon == 0 ? (
                                _data.status == 1 ? (
                                    <span className="order-status fr">买家待付款</span>
                                ) : (
                                    _data.status == 2 ? (
                                        <span className="order-status fr">订单已付款</span>
                                    ) : (
                                        <span className="order-status fr">订单已取消</span>
                                    )
                                )
                            ): (
                                _data.is_auto_confirm == 0 ? (
                                    <span className="order-status fr">订单待确认</span>
                                ) : (
                                    <span className="order-status fr">订单已确认</span>
                                )
                            ) }
                            
                        </h3>
                        <div className="part-list">
                            <div className="part-info clearfix">
                                <Link to={`/ProductDetails/${_data.goods_id}`}>
                                    <img src={_data.goods.goods_images[0]||_data.goods.goods_images[1]||_data.goods.goods_images[2]} alt="" className="fl" />
                                    <div className="part-detail">
                                        <h4>{_data.goods.title}</h4>
                                        <p>{_data.feature_main} {_data.feature_sub}</p>
                                        <p>&yen;{_data.goods_price} {/*<s>&yen;999.00</s>*/} <span className="fr">快递：{_data.goods_postage}元</span></p>
                                        <span>&times;{_data.total_number}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="part-subtotal">实付：<span>{_data.preferential}</span>元</div>
                        <div className="ordernumber">
                            <p>订单编号：<span>{_data.common_out_trade_no}</span></p>
                            <p>创建时间：<span>{_data.created_at}</span></p>
                            {_data.parcel_num ? (
                                <p>物流编号：<span>_data.parcel_num</span></p>
                            ) : ''}
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
                                        <span className="fr" data-id={`${_data.id}`} onClick={e=>this.ConfirmOrder(e)}>确认收货</span>
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