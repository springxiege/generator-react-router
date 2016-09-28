import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    getReceiptOrder,
    // getMoreReceiptOrder
} from './constants'
import CommonImage from '../../../components/CommonImage'
import CommonLogo from '../../../components/CommonLogo'
import LoadMorePageData from '../../../event/event.LoadMorePageData'
import scrollLoading from '../../../event/event.scrollLoading'
class ReceiptOrder extends Component{
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
            url: config.url + '/orders/posting',
            page: 2,  
            flag: true,
            noMore: false, 
            callback:function(pdata){                            // 回调函数，请求成功后执行
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getReceiptOrder(newData));
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
        document.title = '已发货';
        let _this = this;
        this.serverRequest = $.ajax({
            url: _this.state.url,
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize: config.pagesize,
                page:1
            },
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                // console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getReceiptOrder(data.data.data));
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
                    }else{
                        alert(data.data.msg)
                    }
                }
            }
        })

    }
    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll',this.LoadMorePageData);
        window.removeEventListener('scroll',this.scrollLoading);
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
                        config.setRequestHeader(request);
                    },
                    error:(error)=>{
                        config.ProcessError(error);
                    },
                    success:(data)=>{
                        // console.log(data)
                        if(parseInt(data.code) === 0){
                            $.tips(data.data.msg)
                            window.location.hash = '#/RateOrder'
                        }
                    }
                })
            },
            CancelBtn:function(){}
        })
    }
    render(){
        let _HTML = (<p className="nolist">暂无待确认收货订单</p>)
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                _totalPrice += (item.preferential-0)

                return (
                    <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3>
                                <CommonLogo src={item.shop.shop_logo} />
                                &ensp;&ensp;{item.shop.shop_name||''} 
                                <span className="order-status fr">卖家已发货</span>
                            </h3>
                            <div className="part-list" data-id={item.id}>
                                <div className="part-info ">
                                    <Link to={`/OrderDetail/${item.id}`} className="clearfix">
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
                            <div className="part-subtotal clearfix">
                                <Link to={`/ParcelDetail/${item.express_coding}/${item.parcel_num}`} className="order-parcel fl">物流详情</Link>
                                小计：<span>{_totalPrice}</span>元
                            </div>
                            <div className="part-funcs">
                                {/*<span className="fr"><Link to="">查看物流</Link></span>*/}
                                <span className="fr" onClick={e=>this.ConfirmOrder(e)}>确认收货</span>
                                <span className="change fr"><Link to={`/ReturnsReason/${item.id}/ReturnOrder`}>换货</Link></span>
                                <span className="return fr"><Link to={`/ReturnsReason/${item.id}/ReceiptOrder`}>退货</Link></span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                {_HTML}
                <p id="loading-more" style={{display:this.state.loadMore?"block":"none"}}>{this.state.noMore?"已加载全部":'列表加载中···'}</p>
            </div>
        )
    }
}
function select(state){
    return {state:state.ReceiptOrder};
}
export default connect(select)(ReceiptOrder);
