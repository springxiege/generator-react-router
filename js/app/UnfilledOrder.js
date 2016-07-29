import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    getUnfilledOrder,
    getMoreUnfilledOrder
} from '../actions/ActionFuncs'
class UnfilledOrder extends Component{
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
            url: config.url + '/orders/predelivery',
            pagesize: 2, 
            page: 2, 
            flag: true,
            noMore: false, 
            winHeight: $(window).height(), 
            callback:function(pdata){  
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMoreUnfilledOrder(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
        };
        this.loadMorePage = this.loadMorePage.bind(this);
    }
    componentDidMount() {
        document.title = '待发货订单'
        let _this = this
        this.serverRequest = $.ajax({
            url: _this.state.url,
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize: _this.state.pagesize,
                page: 1
            },
            beforeSend:(request)=>{
                $.loading.show();
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    this.props.dispatch(getUnfilledOrder(data.data.data))
                    $.loading.hide()
                    // 加载更多列表
                    window.addEventListener('scroll',_this.loadMorePage);
                }
            }
        });

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
                            request.setRequestHeader("Authorization", "Bearer " + config.head);
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
                    beforeSend:(request)=>{
                        if(config.head!=''){
                            request.setRequestHeader("Authorization", "Bearer " + config.head);
                        }
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        console.log(data)
                        if(parseInt(data.code) === 0){
                            $.error(data.data.msg,800,function(){
                                window.location.hash = '#/ReturnOrder'
                            })
                        }
                    }
                })

            }
        })
    }
    render(){
        let _HTML = (<p className="nolist">暂无待发货订单</p>)
        let _data = this.props.state.data
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                let _totalPrice = 0
                return (
                    <div className="main-module" key={index}>
                        <div className="part-item">
                            <h3><img src={item.logo !="" ? item.logo :"images/3.jpg"} alt="" />&ensp;&ensp;{item.shop_name} <span className="order-status fr">卖家待发货</span></h3>
                            {item.items.map((subitem,subindex)=>{
                                _totalPrice += (subitem.preferential-0)
                                return (
                                    <div className="part-list" key={subindex} data-id={subitem.id}>
                                        <div className="part-info ">
                                            <Link to={`/ProductDetails/${subitem.goods_id}`} className="clearfix">
                                                <img src={subitem.goods.goods_images[0]||subitem.goods.goods_images[1]||subitem.goods.goods_images[2]} alt="" className="fl" />
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
