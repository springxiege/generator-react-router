import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getReturnOrder
} from '../actions/ActionFuncs'
class ReturnOrder extends Component{
    componentDidMount() {
        document.title = '退换货'    
        this.serverRequest = $.ajax({
            url: config.url + '/orders/abandon',
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
                        this.props.dispatch(getReturnOrder(data.data.data))
                    }
                }
            }
        });
         
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render(){
        let _HTML = '暂无退换货订单'
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
                                <span className="fr">{item.abandon_type == 1?"退款中":"退货中"}</span>
                                {item.is_confirm == 1 ? (<span className="fr">售后跟踪</span>) : ""}
                            </div>
                            <div className="return-detail clearfix">
                                <div className="return-logo fl"><p>{(item.abandon_type == 1) ? (item.is_confirm==1?"已退款":"退款中") : (item.is_confirm==1 ? "已换货" : "换货中")}</p></div>
                                <div className="return-info">
                                    {item.tel===null ? (
                                        <p>商家联系电话：<a href="javascript:;">暂无联系方式</a></p>
                                    ) : (
                                        <p>商家联系电话：<a href="tel://$item.tel">item.tel</a></p>
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
            <div>{_HTML}</div>
        )
    }
}
function select(state){
    return {state:state.ReturnOrder};
}
export default connect(select)(ReturnOrder);