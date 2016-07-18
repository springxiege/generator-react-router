import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getReceiptOrder
} from '../actions/ActionFuncs'
class ReceiptOrder extends Component{
    componentDidMount() {
        document.title = '已发货'     
        this.serverRequest = $.ajax({
            url: config.url + '/orders/posting',
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
                        this.props.dispatch(getReceiptOrder(data.data.data))
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
    ConfirmOrder(e){
        let $order = $(e.target).closest('.main-module')
        let _ids = []
        $order.find('.part-list').each(function(index,item){
            _ids.push($(item).data('id'))
        })
        $.confirm({
            titleclsName:'lytitle',
            contentclsName:'lynote',
            title:'<p>我要联赢提示</p>',
            content:'<p>1.确认收货后将无法通过系统发起退换货;</p><p>2.请您再三确认收到的宝贝是否满意再确认收货</p>',
            time:10,
            okBtn:function(){
                $.ajax({
                    url: config.url + '/orders/parcel',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _method:'put',
                        ids:_ids
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        console.log(data)
                        if(parseInt(data.code) === 0){
                            $.error(data.data.msg)
                        }
                    }
                })
            }
        })
    }
    ReturnOrder(e){
        
    }
    render(){
        let _HTML = '暂无待确认收货订单'
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                _totalPrice += (item.preferential-0)

                return (
                    <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3><img src={item.shop.user_info.logo !="" ? item.shop.user_info.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop.shop_name!=""?(item.shop.shop_name):(item.shop.user_info.realname)} <span className="order-status fr">卖家已发货</span></h3>
                            <div className="part-list" data-id={item.id}>
                                <div className="part-info ">
                                    <Link to={'/ProductDetails/'+item.goods_id} className="clearfix">
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
                            <div className="part-subtotal">
                                小计：<span>{_totalPrice}</span>元
                            </div>
                            <div className="part-funcs">
                                {/*<span className="fr"><Link to="">查看物流</Link></span>*/}
                                <span className="fr" onClick={e=>this.ConfirmOrder(e)}>确认收货</span>
                                <span className="fr"><Link to={'/Reason/'+item.id}>换货</Link></span>
                                <span className="fr"><Link to={'/Back/'+item.id}>退货</Link></span>
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
    return {state:state.ReceiptOrder};
}
export default connect(select)(ReceiptOrder);