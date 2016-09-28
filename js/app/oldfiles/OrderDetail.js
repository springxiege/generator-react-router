import React,{Component} from 'react'
import {Link} from 'react-router'
// import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import { 
    getOrderDetail
} from '../actions/ActionFuncs'
import CommonImage from '../components/CommonImage'
import CommonLogo from '../components/CommonLogo'
import ButtonCenter from '../components/ButtonCenter'
class OrderDetail extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        document.title = '订单详情'
        let _type = this.props.params.ordertype
        let _params = {}
        if(_type == 'Return'){
            _params.type = 1
        }
        this.serverRequest = $.ajax({
            url: config.url + '/orders/details/' + this.props.params.orderId,
            type: 'GET',
            dataType: 'json',
            data: _params,
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
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
    // ConfirmOrder(e){
    //     let _id = $(findDOMNode(e.target)).data('id')
    //     let _ids = [_id]
    //     $.confirm({
    //         titleclsName:'lytitle',
    //         contentclsName:'lynote',
    //         title:'<p>我要联赢提示</p>',
    //         content:'<p>1.确认收货后将无法通过系统发起退换货;</p><p>2.请您再三确认收到的宝贝是否满意再确认收货</p>',
    //         time:5,
    //         okBtn:function(){
    //             $.ajax({
    //                 url: config.url + '/orders/parcel',
    //                 type: 'put',
    //                 dataType: 'json',
    //                 data: {
    //                     ids:_ids
    //                 },
    //                 beforeSend:(request)=>{
    //                     config.setRequestHeader(request);
    //                 },
    //                 error:(error)=>{
    //                     config.ProcessError(error);
    //                 },
    //                 success:(data)=>{
    //                     // console.log(data)
    //                     if(parseInt(data.code) === 0){
    //                         $.tips(data.data.msg)
    //                         window.location.hash = '#//RateOrder'
    //                     }
    //                 }
    //             })
    //         }
    //     })
    // }
    UpdateOrder(e){
        $.tips('提醒发货成功')
    }
    render(){
        let _data = this.props.state.data;
        let item = _data[0];
        return (
            <div className="main">
                {parseInt(item.is_abandon) === 0 ? (
                    parseInt(item.status) === 1 ? (
                        <div className="orderheader">待付款</div>
                    ) : (
                        parseInt(item.status) === 2 ? (
                            parseInt(item.parcel_status) === 0 ? (
                                <div className="orderheader">未发货</div>
                            ) : (
                                parseInt(item.parcel_status) === 1 ? (
                                    <div className="orderheader">已发货</div>
                                ) : (
                                    <div className="orderheader">已收货</div>
                                )
                            )
                        ) : (
                            <div className="orderheader">订单已取消</div>
                        )
                        
                    )
                ): (
                    item.deleted_at ? (
                        <div className="orderheader">订单交易完成</div>
                    ) : (
                        parseInt(item.abandon_type) === 1 ? (
                            parseInt(item.is_confirm) === 0 ? (
                                <div className="orderheader">申请退款(退货)中</div>
                            ) : (
                                <div className="orderheader">退款(退货)中</div>
                            )
                        ) : (
                            parseInt(item.is_confirm) === 0 ? (
                                <div className="orderheader">申请换货中</div>
                            ) : (
                                <div className="orderheader">换货中</div>
                            )
                        )
                    )
                )}
                <div className="part-address">
                    <h2>收货人：{item.purchaser||'...'}<span className="fr">{item.purchaser_phone||1300000000}</span></h2>
                    <p>收货地址：{item.purchaser_address||'...'}</p>
                </div>
                {_data.map((item,index)=>{
                    return (
                        <div className="main-module bbn mgb0" key={index}>
                            <div className="part-item">
                                <h3>
                                    <CommonLogo src={item.shop.shop_logo} />
                                    {item.shop.shop_name}
                                    {item.is_abandon == 0 ? (
                                        item.status == 1 ? (
                                            <span className="order-status fr">买家待付款</span>
                                        ) : (
                                            item.status == 2 ? (
                                                <span className="order-status fr">订单已付款</span>
                                            ) : (
                                                <span className="order-status fr">订单已取消</span>
                                            )
                                        )
                                    ): (
                                        item.is_confirm == 0 ? (
                                            <span className="order-status fr">订单待确认</span>
                                        ) : (
                                            <span className="order-status fr">订单已确认</span>
                                        )
                                    ) }
                                </h3>
                                <div className="part-list">
                                    <div className="part-info clearfix">
                                        <a href={item.goods.goodsLink}>
                                            <CommonImage src={item.goods.goods_images} className="fl" />
                                            <div className="part-detail">
                                                <h4>{item.goods.title}</h4>
                                                <p>{item.feature_main} {item.feature_sub}</p>
                                                <p>
                                                    &yen;{item.goods_price} {/*<s>&yen;999.00</s>*/} 
                                                    <span className="fr">快递：{item.goods_postage}元</span>
                                                </p>
                                                <span>&times;{item.total_number}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="part-subtotal">实付：<span>{item.preferential}</span>元</div>
                                <div className="ordernumber">
                                    <p>订单编号：<span>{item.common_out_trade_no}</span></p>
                                    <p>创建时间：<span>{item.created_at}</span></p>
                                    {item.parcel_num ? (
                                        <p>物流单号：<span>{item.parcel_num}</span>
                                            {/*<span onClick={()=>copyToClipboard(item.parcel_num)}>复制</span>
                                             <a href="http://m.kuaidi100.com/">查询</a>*/}
                                        </p>
                                    ) : ''}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/*<div className="main-module">
                    <div className="part-item">
                        
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
                </div>*/}
                <ButtonCenter />
                {item.parcel_num ? (
                    <Link className="btn-add-address" to={`/ParcelDetail/${item.express_coding}/${item.parcel_num}`}>查看物流</Link>
                ) : ''}
            </div>
        )
    }
}
function select(state){
    return {state:state.OrderDetail};
}
export default connect(select)(OrderDetail);