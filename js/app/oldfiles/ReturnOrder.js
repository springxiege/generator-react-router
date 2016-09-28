import React,{Component} from 'react'
import {Link} from 'react-router'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {
    getReturnOrder,
    loadMoreReturnOrder
} from '../actions/ActionFuncs'
import CommonImage from '../components/CommonImage'
import CommonLogo from '../components/CommonLogo'
import LoadMorePageData from '../event/event.LoadMorePageData'
import scrollLoading from '../event/event.scrollLoading'
class ReturnOrder extends Component{
    constructor() {
        super();
        let _this = this;
        /**
         * [url 请求url获取数据
         *  pagesize 返回的数据每一页的条数
         *  page 请求的第几页
         *  flag 请求标识，当正在请求中时该标识为false则不能再次请求
         *  noMore 请求更多标识，为true则表示没有更多数据了，不再进行请求
         *  winHeight window的窗口高度
         *  callback 回调函数，请求成功后执行]
         * @type {[type]}
         */
        this.state = {
            url: config.url + '/orders/abandon',
            page: 2, 
            flag: true,
            noMore: false,  
            callback: function(pdata){  
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(loadMoreReturnOrder(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
            loadMore:true
        };
        this.LoadMorePageData = LoadMorePageData.bind(this);
        this.scrollLoading = scrollLoading.bind(this);
    }
    componentDidMount() {
        document.title = '退换货'
        let _this = this
        this.serverRequest = $.ajax({
            url: _this.state.url,
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize: config.pagesize,
                page: 1
            },
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code) === 0){

                    if(data.data.data){
                        this.props.dispatch(getReturnOrder(data.data.data))
                        $.loading.hide();
                        _this.scrollLoading();
                        // 加载更多列表
                        if(parseInt(data.data.last_page) <= 1){
                            // $('#loading-more').html('已全部加载')
                            this.setState({
                                loadMore:true,
                                noMore:true
                            })
                        }else{
                            window.addEventListener('scroll',_this.LoadMorePageData);
                            window.addEventListener('scroll',_this.scrollLoading);
                        };
                        if(parseInt(data.data.last_page) === 0){
                            // $('#loading-more').hide();
                            this.setState({
                                loadMore:false
                            })
                        }
                    }
                }
            }
        });

    }
    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll',this.LoadMorePageData);
        window.removeEventListener('scroll',this.scrollLoading);
    }
    handleShowDetails(e){
        let $target = $(findDOMNode(e.target)).closest('.part-funcs');
        if($target.hasClass('show')){
            $target.removeClass('show').siblings('.return-detail').slideUp()
        }else{
            $target.addClass('show').siblings('.return-detail').slideDown()
        }
    }
    render(){
        let _HTML = (<p className="nolist">暂无退换货订单</p>)
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                _totalPrice += (item.preferential-0)
                return (
                    <div className="main-module" key={index}>
                        <div className={item.deleted_at === null ? "part-item returnning" : "part-item returned"}>
                            <h3>
                                <CommonLogo src={item.shop.shop_logo} />
                                &ensp;&ensp;
                                {item.shop.shop_name}
                                <span className="order-status fr">
                                    {item.abandon_type == 1 ? (
                                        item.parcel_status == 0 ? (
                                            item.deleted_at == null ? "退款中" :"已退款"
                                        ) : (
                                            item.deleted_at === null ? "退货中" : "已退货"
                                        )
                                    ):(
                                        item.is_confirm == 1 ? (
                                            item.deleted_at === null ? "换货中" : "已换货"
                                        ) : "换货中"
                                    )}
                                </span>
                            </h3>
                            <div className="part-list">
                                <div className="part-info">
                                    <Link to={`/OrderDetail/${item.id}/Return`} className="clearfix">
                                        <CommonImage src={item.goods.goods_images} className="fl" />
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
                                {item.abandon_type == 1 ? (
                                    item.parcel_status == 0 ? (
                                        item.deleted_at == null ? (
                                            <span className="returning-money fr" onClick={e=>this.handleShowDetails(e)}>退款中</span>
                                        ):(
                                            <span className="returned-money fr" onClick={e=>this.handleShowDetails(e)}>已退款</span>
                                        )
                                    ) : (
                                        item.deleted_at === null ? (
                                            <span className="returnning fr" onClick={e=>this.handleShowDetails(e)}>退货中</span>
                                        ) : (
                                            <span className="returned-money fr" onClick={e=>this.handleShowDetails(e)}>已退货</span>
                                        )
                                    )
                                    
                                ):(
                                    item.is_confirm == 1 ? (
                                        item.deleted_at === null ? (
                                            <span className="returning fr" onClick={e=>this.handleShowDetails(e)}>换货中</span>
                                        ) : (
                                            <span className="returned-order fr" onClick={e=>this.handleShowDetails(e)}>已换货</span>
                                        )
                                        
                                    ) : (
                                        <span className="returning fr" onClick={e=>this.handleShowDetails(e)}>换货中</span>
                                    )
                                )}
                                {item.deleted_at === null && item.parcel_status != 0 ? (
                                    <span className="tracking fr"><Link to={`/Tracking/${item.order_id}`}>售后跟踪</Link></span>
                                ) : ''}
                                
                            </div>
                            <div className="return-detail clearfix">
                                <div className="return-logo fl">
                                    {item.abandon_type == 1 ? (
                                        item.parcel_status == 0 ? (
                                            item.deleted_at == null ? (
                                                <p>退款中</p>
                                            ):(
                                                <p>已退款</p>
                                            )
                                        ) : (
                                            item.deleted_at === null ? (
                                                <p>退货中</p>
                                            ) : (
                                                <p>已退货</p>
                                            )
                                        )
                                        
                                    ):(
                                        item.is_confirm == 1 ? (
                                            item.deleted_at === null ? (
                                                <p>换货中</p>
                                            ) : (
                                                <p>已换货</p>
                                            )
                                            
                                        ) : (
                                            <p>换货中</p>
                                        )
                                    )}
                                </div>
                                <div className="return-info">
                                    {item.shop.after_market_tel == "" ? (
                                        <p>商家联系电话：<a href="javascript:;">暂无联系方式</a></p>
                                    ) : (
                                        <p>商家联系电话：<a href={`tel://${item.shop.user_info.service_mobile}`}>{item.shop.after_market_tel}</a></p>
                                    )}
                                    <p>等待商家确认：
                                        <span>
                                            {item.is_confirm==1?"已确认":"未确认"}
                                        </span>
                                    </p>
                                    {item.parcel_status==0 ? (
                                        <p>退货款将返回：
                                            <span>
                                                {item.type == 2?"支付宝":"微信钱包"}
                                            </span>
                                        </p>
                                    ) : (
                                        <p>换货物将返回：<span>收货人</span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div id="boxmodel">
                {_HTML}
                <p id="loading-more" style={{display:this.state.loadMore?"block":"none"}}>{this.state.noMore?"已加载全部":'列表加载中···'}</p>
            </div>
        )
    }
}
function select(state){
    return {state:state.ReturnOrder};
}
export default connect(select)(ReturnOrder);
