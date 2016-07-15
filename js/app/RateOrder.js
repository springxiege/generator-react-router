import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getRateOrder,
    getOrderComment
} from '../actions/ActionFuncs'
class RateOrder extends Component{
    componentDidMount() {
        document.title = '评价'   
        this.serverRequest = $.ajax({
            url: config.url + '/orders/comment',
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
                        this.props.dispatch(getRateOrder(data.data.data))
                    }
                }
            }
        })
          
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    ConfirmOrder(e){
        
    }
    ShowComment(e){
        let $target = $(e.target)
        let $origin = $target.closest('.part-funcs').siblings('.comment-detail')
        let id = $target.data('id')
        $.ajax({
            url: config.url + '/orders/comment/' + id,
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
                        let _HTML = ''
                        $.each(data.data.data,function(index,item){
                            _HTML += '<div class="comment-con"><header>评价：2016年07月13日 17:18 <span class="fr stars stars-1"></span></header>'
                                    +'<article>宝贝很不错，这个价格挺值的，喜欢的亲们不要犹豫呀！</article></div>'
                        })
                        $origin.empty().append(_HTML).slideToggle()
                    }else{
                        $.error(data.data.msg,1000)
                    }
                    
                }
            }
        })
        
    }
    render(){
        let _HTML = '暂无待评价订单'
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                let _link = '/ProductDetails/'+item.goods_id
                _totalPrice += (item.preferential-0)
                return (
                    <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3><img src={item.shop.user_info.logo !="" ? item.shop.user_info.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop.shop_name!=""?(item.shop.shop_name):(item.shop.user_info.realname)} <span className="order-status fr">交易成功</span></h3>
                            <div className="part-list">
                                <div className="part-info ">
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
                            <div className="part-subtotal">
                                小计：<span>{_totalPrice}</span>元
                            </div>
                            <div className="part-funcs">
                                <span className="fr" onClick={e=>this.ConfirmOrder(e)}>评价</span>
                                <span className="fr" onClick={e=>this.ShowComment(e)} data-id={item.id}>查看评价</span>
                            </div>
                            <div className="return-detail comment-detail clearfix">
                                {/*
                                <div className="comment-con">
                                    <header>评价：2016年07月13日 17:18 <span className="fr stars stars-1"></span></header>
                                    <article>宝贝很不错，这个价格挺值的，喜欢的亲们不要犹豫呀！</article>
                                    <div className="comment-replay">
                                        <header>商家回复：2016年07月13日 18:00</header>
                                        <summary>商家：感谢您的惠顾与支持，有不懂的地方都可以咨询我们的售后技术员们，祝您生活愉快</summary>
                                    </div>
                                </div>
                                <div className="comment-con">
                                    <header>追评：2016年07月13日 17:18 <span className="fr stars stars-1"></span></header>
                                    <article>宝贝很不错，这个价格挺值的，喜欢的亲们不要犹豫呀！</article>
                                    <div className="comment-replay">
                                        <header>商家回复：2016年07月13日 18:00</header>
                                        <summary>商家：感谢您的惠顾与支持，有不懂的地方都可以咨询我们的售后技术员们，祝您生活愉快</summary>
                                    </div>
                                </div>
                                */}
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
    return {state:state.RateOrder};
}
export default connect(select)(RateOrder);