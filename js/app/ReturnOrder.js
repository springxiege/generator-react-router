import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getReturnOrder,
    loadMoreReturnOrder
} from '../actions/ActionFuncs'
class ReturnOrder extends Component{
    componentDidMount() {
        document.title = '退换货' 
        let _this = this   
        this.serverRequest = $.ajax({
            url: config.url + '/orders/abandon?pagesize=2',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getReturnOrder(data.data.data))
                        $.loading.hide();
                        // 加载更多列表
                        $.loadpage({
                            url:config.url + '/orders/abandon?pagesize=2',
                            callback:function(pdata){
                                if(parseInt(pdata.code) === 0){
                                    if(pdata.data.data&&pdata.data.data.length){
                                        let curData = _this.props.state.data
                                        let newData = curData.concat(pdata.data.data)
                                        _this.props.dispatch(loadMoreReturnOrder(newData))
                                    }
                                }
                            }
                        })
                    }
                }
            }
        });
         
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render(){
        let _HTML = (<p className="nolist">暂无退换货订单</p>)
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                let _link = '/ProductDetails/'+item.goods_id
                _totalPrice += (item.preferential-0)

                return (
                    <div className="main-module" key={index}>
                        <div className={item.is_confirm==1?"part-item returned":"part-item returnning"}>
                            <h3><img src={item.shop.user_info.logo !="" ? item.shop.user_info.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop.shop_name!=""?(item.shop.shop_name):(item.shop.user_info.realname)} <span className="order-status fr">{(item.abandon_type == 1) ? (item.is_confirm==1?"已退款":"退款中") : (item.is_confirm==1 ? "已换货" : "换货中")}</span></h3>
                            <div className="part-list">
                                <div className="part-info">
                                    <Link to={_link} className="clearfix">
                                        <img src={item.goods.goods_images[0]} alt="" className="fl" />
                                        <div className="part-detail">
                                            <h4>{item.goods.title}</h4>
                                            <p>{item.feature_main}&ensp;{item.feature_sub}</p>
                                            <p>&yen;{item.goods_price} {/*<s>&yen;999.00</s>*/} <span className="fr">快递：{item.goods_postage}元</span></p>
                                            <span>&times;{item.total_number}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="part-subtotal">小计：<span>{_totalPrice}</span>元</div>
                            <div className="part-funcs return-order">
                                <span className="fr">{(item.abandon_type == 1) ? (item.is_confirm==1?"已退款":"退款中") : (item.is_confirm==1 ? "已换货" : "换货中")}</span>
                                <span className="fr"><Link to={"/Tracking/"+item.order_id}>售后跟踪</Link></span>
                            </div>
                            <div className="return-detail clearfix">
                                <div className="return-logo fl"><p>{(item.abandon_type == 1) ? (item.is_confirm==1?"已退款":"退款中") : (item.is_confirm==1 ? "已换货" : "换货中")}</p></div>
                                <div className="return-info">
                                    {item.shop.user_info.service_mobile == "" ? (
                                        <p>商家联系电话：<a href="javascript:;">暂无联系方式</a></p>
                                    ) : (
                                        <p>商家联系电话：<a href={`tel//${item.shop.user_info.service_mobile}`}>{item.shop.user_info.service_mobile}</a></p>
                                    )}
                                    
                                    <p>等待商家确认：<span>{item.is_confirm==1?"已确认":"未确认"}</span></p>
                                    <p>退货款将返回：<span>{item.type == 2?"支付宝":"微信钱包"}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div id="boxmodel">{_HTML}</div>
        )
    }
}
function select(state){
    return {state:state.ReturnOrder};
}
export default connect(select)(ReturnOrder);