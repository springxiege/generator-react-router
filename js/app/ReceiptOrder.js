import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    getReceiptOrder,
    getMoreReceiptOrder
} from '../actions/ActionFuncs'
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
            pagesize: 2, 
            page: 2,  
            flag: true,
            noMore: false, 
            winHeight: $(window).height(), 
            callback:function(pdata){                            // 回调函数，请求成功后执行
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMoreReceiptOrder(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
        };
        this.loadMorePage = this.loadMorePage.bind(this);
    }
    componentDidMount() {
        document.title = '已发货';
        let _this = this;
        this.serverRequest = $.ajax({
            url: _this.state.url,
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize: _this.state.pagesize,
                page:1
            },
            beforeSend:(request)=>{
                $.loading.show();
                if(config.head!=''){
                    request.setRequestHeader("token", config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getReceiptOrder(data.data.data));
                        $.loading.hide();
                        // 加载更多列表
                        window.addEventListener('scroll',_this.loadMorePage);
                    }else{
                        alert(data.data.msg)
                    }
                }
            }
        })

    }
    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll',this.loadMorePage);
    }
    // 加载更多
    // opt为传入的对象
    // 其中包括请求链接
    // 每页返回数据条数
    // 请求第几页参数
    // 回调参数
    loadMorePage(){
        let opt = this.state;
        let _scrollTop = $(window).scrollTop();
        let _bodyHeight = $('body').height();
        if(_scrollTop >= (_bodyHeight - opt.winHeight)){
            if(opt.flag && !opt.noMore){
                $.ajax({
                    url:opt.url,
                    type:'GET',
                    dataType:'json',
                    data:{
                        pagesize:opt.pagesize,
                        page:opt.page
                    },
                    beforeSend:(request)=>{
                        this.setState({
                            flag:false
                        })
                        if(config.head!=''){
                            request.setRequestHeader("token", config.head);
                        }
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        opt.callback && opt.callback(data);
                        this.setState({
                            flag:true
                        })
                        if(data.data.data.length){
                            let nextpage = (opt.page - 0) + 1
                            this.setState({
                                page:nextpage
                            })
                        }else{
                            this.setState({
                                noMore:true
                            })
                        }
                    }
                })
            }
        }

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
                    headers:{
                        token:config.head
                    },
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
                            window.location.hash = '#//RateOrder'
                        }
                    }
                })
            }
        })
    }
    ReturnOrder(e){

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
                            <h3><img src={item.shop.user_info.logo !="" ? item.shop.user_info.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop.shop_name!=""?(item.shop.shop_name):(item.shop.user_info.realname)} <span className="order-status fr">卖家已发货</span></h3>
                            <div className="part-list" data-id={item.id}>
                                <div className="part-info ">
                                    <Link to={'/ProductDetails/'+item.goods_id} className="clearfix">
                                        <img src={item.goods.goods_images[0]||item.goods.goods_images[1]||item.goods.goods_images[2]} alt="" className="fl" />
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
                                <span className="fr"><Link to={`/Reason/${item.id}`}>换货</Link></span>
                                <span className="fr"><Link to={`/Back/${item.id}`}>退货</Link></span>
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
