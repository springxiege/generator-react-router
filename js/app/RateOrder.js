import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {  
    getRateOrder,
    getOrderComment,
    getMoreRateOrder
} from '../actions/ActionFuncs'
class RateOrder extends Component{
    componentDidMount() {
        document.title = '评价'   
        let _this = this
        this.serverRequest = $.ajax({
            url: config.url + '/orders/comment?pagesize=2',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:function(){
                $.loading.show();
            },
            error:(error)=>{
                console.error(error);
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getRateOrder(data.data.data));
                        $.loading.hide();
                        // 加载更多列表
                        $.loadpage({
                            url:config.url + '/orders/comment?pagesize=2',
                            callback:function(pdata){
                                if(parseInt(pdata.code) === 0){
                                    if(pdata.data.data&&pdata.data.data.length){
                                        let curData = _this.props.state.data
                                        let newData = curData.concat(pdata.data.data)
                                        _this.props.dispatch(getMoreRateOrder(newData))
                                    }
                                }
                            }
                        })
                    }
                }
            }
        })
          
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    ShowComment(e){
        let $target = $(e.target)
        let $origin = $target.closest('.part-funcs').siblings('.comment-detail')
        let id = $target.data('id')
        if($origin.hasClass('show')){
            $origin.removeClass('show').slideUp()
        }else{
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
                        if(data.data.data.length){
                            let _HTML = ''
                            $.each(data.data.data,function(index,item){
                                if(parseInt(item.type) === 1){
                                    _HTML += '<div class="comment-con">'
                                                +'<header>评价：'+item.created_at
                                                    +'<span class="fr stars stars-'+item.satisfaction_star+'"></span>'
                                                +'</header>'
                                                +'<article>'+item.content+'</article>'
                                            +'</div>'
                                }else{
                                    _HTML += '<div class="comment-replay">'
                                                +'<header>商家回复：'+item.created_at+'</header>'
                                                +'<summary>商家：'+item.content+'</summary>'
                                            +'</div>'
                                }
                            })
                            $origin.empty().append(_HTML).addClass('show').slideDown()
                        }else{
                            $.error(data.data.msg,1000)
                        }
                        
                    }
                }
            })
        }
        
        
    }
    render(){
        let _HTML = (<p className="nolist">暂无待评价订单</p>)
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
                                {item.comment_stats==0 ? (
                                    <span className="fr"><Link to={"/Comment/"+item.id}>评价</Link></span>
                                ) : (
                                    item.comment_stats==1 ? (
                                        <span className="fr">待商家回复</span>
                                    ) : (
                                        <span className="fr"><Link to={"/Comment/"+item.id}>追评</Link></span>
                                    )
                                )}
                                
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