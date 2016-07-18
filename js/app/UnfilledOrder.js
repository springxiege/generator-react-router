import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getUnfilledOrder
} from '../actions/ActionFuncs'
class UnfilledOrder extends Component{
    componentDidMount() {
        document.title = '待发货订单'  
        this.serverRequest = $.ajax({
            url: config.url + '/orders/predelivery',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    this.props.dispatch(getUnfilledOrder(data.data.data))
                }
            }
        });
        
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    UpdateOrder(e){
        $.error('提醒发货成功')
    }
    doReturnOrder(e){
        let $order = $(e.target).closest('.main-module')
        let _ids = []
        $order.find('.part-list').each(function(index,item){
            _ids.push($(item).data('id'))
        })
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
                            $.error(data.data.msg,1000,function(){
                                
                            })
                        }
                    }
                })
                
            }
        })
    }
    render(){
        let _HTML = '暂无待支付订单'
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                return (
                    <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3><img src={item.logo !="" ? item.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop_name} <span className="order-status fr">卖家待发货</span></h3>
                            {item.items.map((subitem,subindex)=>{
                                let _link = '/ProductDetails/'+subitem.goods_id
                                _totalPrice += (subitem.preferential-0)
                                return (
                                    <div className="part-list" key={subindex} data-id={subitem.id}>
                                        <div className="part-info ">
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
                                <span className="fr" onClick={e=>this.UpdateOrder(e)}>提醒发货</span>
                                <span className="fr" onClick={e=>this.doReturnOrder(e)}>退款</span>
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
    return {state:state.UnfilledOrder};
}
export default connect(select)(UnfilledOrder);