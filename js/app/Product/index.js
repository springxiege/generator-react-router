'use strict';
// 详情页  page
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom'
import { Provider, connect } from 'react-redux'
import ProductImages from '../../components/ProductImages';
import ProductSku from '../../components/ProductSku';
import Recommend from '../../components/Recommend';
import ProductSkuSelect from '../../components/ProductSkuSelect'
import ProductDetailFooter from '../../components/ProductDetailFooter';
import ReturnTop from '../../components/ReturnTop'
import {
    GoodsDetail,
    AddCollect,
    ShowAndHideSelectSku, 
    GetComment
} from './constants'
import doCollect from '../../event/event.doCollect'
import addToShopCart from '../../event/event.addToShopCart'
import scrollLoading from '../../event/event.scrollLoading'
import getCommentList from '../../event/event.getCommentList'
import LoadMorePageData from '../../event/event.LoadMorePageData'
import setFixed from '../../event/event.setFixed'
class ProductDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            collect:false,
            id:1,
            target: 0,
            type:0,
            fixed:false,
            loadComment:true,
            pagesize:10,
            flag:true,
            noMore:false,
            vipcode:true,
            callback:function(pdata){
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.CommentList.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(GetComment(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
            nolist:false,
            loadMore:true
        };
        this.doCollect = doCollect.bind(this);
        this.addToShopCart = addToShopCart.bind(this);
        this.setFixed = setFixed.bind(this);
        this.scrollLoading = scrollLoading.bind(this);
        this.getCommentList = getCommentList.bind(this);
        this.LoadMorePageData = LoadMorePageData.bind(this);
    }
    componentDidMount(){
        document.title = '商品详情';
        let _this = this;
        let pathname = window.location.pathname.replace(/\//,'').replace(/\.html/,'');
        this.serverRequest = $.ajax({
            url: config.url + '/goods/detail/'+pathname,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                // alert('网络错误，请重新打开页面！');
                // window.location.reload();
            },
            success: (data)=>{
                if(parseInt(data.code) == 0){

                    document.title = data.data.title

                    this.props.dispatch(GoodsDetail(data.data));

                    let _this = this;
                    // 先销毁Swiper，以防重复创建Swiper并更新Swiper;
                    let pagination = findDOMNode(this.refs.productTabsPage);
                    this.productTabs&&this.productTabs.destroy&&this.productTabs.destroy(false);
                    this.productTabs = new Swiper(findDOMNode(this.refs.productTabs), {
                        initialSlide: 0,
                        autoHeight: true,
                        pagination: pagination,
                        paginationClickable: true,
                        bulletClass: "tab",
                        bulletActiveClass: "cur",
                        paginationBulletRender:(index, clsName)=>{
                            let _name, _comment_count = this.props.state.data.coumt_commet.count;
                            switch (index) {
                                case 0:
                                    _name = "商品详情";
                                    break;
                                case 1:
                                    _name = "产品售后";
                                    break;
                                case 2:
                                    _name = "评价" + (_comment_count > 0 ? "<span>(" + _comment_count + ")</span>" : "");
                                    break;
                                default:
                                    break;
                            }
                            return '<li class="' + clsName +'">' + _name + '</li>';
                        },
                        onSlideChangeEnd:(swiper)=>{
                            if(swiper.activeIndex == 2 && this.state.loadComment){
                                // 传入0表示获取全部评论列表
                                _this.getCommentList(_this.props.state.data.id,0);
                                window.addEventListener('scroll',this.LoadMorePageData);
                            }else{
                                window.removeEventListener('scroll',this.LoadMorePageData);
                            }
                            if(swiper.activeIndex == 1){
                                _this.setState({
                                    vipcode:false
                                })   
                            }else{
                                _this.setState({
                                    vipcode:true
                                }) 
                            }
                        }
                    });
                    window.addEventListener('scroll',this.setFixed);
                    window.addEventListener('scroll',this.scrollLoading);
                    this.setState({
                        target: $(findDOMNode(this.refs.ProductFixed)).offset().top
                    })
                


                    $.loading.hide();
                    // 详情页统计数据
                    let tradeStore = JSON.parse(window.sessionStorage.getItem('trade'));
                    this.setState({
                        id:data.data.id
                    })
                    // console.log('buyid=>',tradeStore)
                    if(tradeStore && tradeStore.userinfo){
                        config.buyid = tradeStore.userinfo.id

                        LYA({
                            action: ['user_visit', 'common'],
                            debug: false,
                            param: {
                                buy_id: config.buyid,
                                goods_id: data.data.id,
                                come_from: 'xds'
                            }
                        });
                        $.refreshToken(function(){
                            // 商品收藏
                            $.ajax({
                                url: config.url + '/goods/collect/whether/' + data.data.id,
                                type: 'POST',
                                dataType: 'json',
                                data: {},
                                beforeSend:(request)=>{
                                    config.setRequestHeader(request);
                                },
                                error:(error)=>{
                                    config.ProcessError(error);
                                },
                                success:(data)=>{
                                    if(parseInt(data.code) === 0){
                                        _this.setState({
                                            collect:data.data[0]
                                        })
                                    }
                                }
                            });
                            // 历史记录
                            $.ajax({
                                url: config.url + '/goods/log/' + data.data.id,
                                type: 'GET',
                                dataType: 'json',
                                data: {},
                                beforeSend:(request)=>{
                                    config.setRequestHeader(request);
                                },
                                error:(error)=>{
                                    config.ProcessError(error);
                                },
                                success:(data)=>{
                                    console.log(data);
                                }
                            })
                            
                        })
                    }

                    

                    
                }else{
                    alert('商品不存在!');
                    window.close();
                    // alert('请求成功，返回错误,错误code:'+data.code+'，请刷新页面重试！');
                    // window.location.reload();
                }

            }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        config.errorImage()    
        this.scrollLoading();
        setTimeout(()=>{
            this.productTabs.update();
        },600) 
    }
    componentWillUnmount() {
        let _this = this;
        this.serverRequest.abort();
        // 销毁Swiper
        window.removeEventListener('scroll',this.setFixed);
        window.removeEventListener('scroll',this.scrollLoading);
        window.removeEventListener('scroll',this.LoadMorePageData);
        this.productTabs.destroy(false);
    }
    render() {
        // var _Children = React.Children.map(this.props.children, function(data) {});
        let pathname = window.location.pathname.replace(/\//,'').replace(/\.html/,'');
        let _state = this.props.state
        let _data = _state.data
        let _good_comment = _data.coumt_commet.favorable_comment
        let _bad_comment = _data.coumt_commet.bad_review
        let CommentData = _state.CommentList
        let CommentDataArray = CommentData.data
        return (
            <div>
                <div className="main">
                    <div className="main-module">
                        <ProductImages />
                        {/*<ProductTitle title={this.props.state.data.title} />*/}
                        <div className="main-title">
                            <h3>{this.props.state.data.title}</h3>
                        </div>
                        {/*<ProductDescription description={this.props.state.data.description} />*/}
                        <div className="main-description">
                            <p>{this.props.state.data.description}</p>
                        </div>
                        <div className="main-price clearfix">
                            <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.state.GoodsSelectSku.price}</div>
                            <div className="main-buycart-icon fr" onClick={e=>this.addToShopCart(1)}><span title="购物车"></span></div>
                            <div className={this.state.collect?"main-collect-icon collected fr":"main-collect-icon fr"} onClick={e=>this.doCollect(e)} ref="collect"><span title="收藏"></span></div>
                        </div>
                        <div className="main-oringinal-price clearfix">
                            <div className="main-oringinal-module fl">原价:<span>{this.props.state.GoodsSelectSku.originalprice}</span></div>
                            <div className="main-fee fr">快递:<span>{this.props.state.data.fare}元</span></div>
                        </div>
                    </div>
                    <ProductSku />
                    {/* 商品详情、产品售后、评价 */}
                    <div className="main-module">
                        <div className="main-detailtab">
                            <div className="main-tab" ref="ProductFixed">
                                <ul className="main-tab-page clearfix" ref="productTabsPage"></ul>
                            </div>
                            <div className="main-product-content swiper-container" ref="productTabs">
                                <div className="main-product-wrapper swiper-wrapper">
                                    <div className="main-product-detail swiper-slide">
                                        <div dangerouslySetInnerHTML={{__html:_data.content}} />
                                    </div>
                                    <div className="main-product-sale swiper-slide">
                                        {_data.get_shop.wx_qrcode ? (
                                            <div className="shop bsb clearfix">
                                                <div className="shop_logo fl">
                                                    <img src={_data.get_shop.shop_logo||'http://s.51lianying.com/images/xds/trade/msg.png'} alt=""/>
                                                    <p>{_data.get_shop.shop_name||'小店'}</p>
                                                </div>
                                                <div className="shop_codeimg fr">
                                                    <div className="codeimg-wrapper">
                                                        <img src={_data.get_shop.wx_qrcode} alt=""/>
                                                    </div>
                                                    <p>长按联系客服微信</p>
                                                </div>
                                            </div>
                                        ) : ''}
                                        <div className="main-table">
                                            <h4>基本参数</h4>
                                            <div className="main-table-body">
                                                <div className="main-table-tr clearfix">
                                                    <div className="main-table-td fl">生产地址</div>
                                                    <div className="main-table-td"><p>{_data.madeby}</p></div>
                                                </div>
                                                <div className="main-table-tr clearfix">
                                                    <div className="main-table-td fl">保质时长</div>
                                                    <div className="main-table-td">
                                                        <p>
                                                            {_data.expire == 1 ? "1年以内" : (
                                                                _data.expire == 2 ? "1~2年" : (
                                                                    _data.expire == 3 ? "2~3年" : (
                                                                        _data.expire == 4 ? "3~5年" : "无限"
                                                                    )
                                                                )
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="main-table-tr clearfix">
                                                    <div className="main-table-td fl">售后方式</div>
                                                    <div className="main-table-td"><p>{_data.maintain==0?"全国联保":"商家自保"}</p></div>
                                                </div>
                                                <div className="main-table-tr clearfix">
                                                    <div className="main-table-td fl">发货地</div>
                                                    <div className="main-table-td"><p>{_data.deliver_address}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 商品详情评论列表 */}
                                    <div className="main-product-comment swiper-slide">
                                        <div className="coment-tab">
                                            <ul>
                                                <li className={this.state.type == 0? "cur" : ""} onClick={e=>this.getCommentList(_data.id,0)}>全部</li>
                                                <li className={this.state.type == 2? "cur" : ""} onClick={e=>this.getCommentList(_data.id,2)}>好评<span>({_good_comment})</span></li>
                                                <li className={this.state.type == 1? "cur" : ""} onClick={e=>this.getCommentList(_data.id,1)}>差评<span>({_bad_comment})</span></li>
                                            </ul>
                                        </div>
                                        <div className="coment-container">
                                            {!CommentDataArray||!CommentDataArray.length?(
                                                this.state.nolist ? (
                                                    <p className="nolist">暂无评论</p>
                                                ) : ''
                                                
                                            ):CommentDataArray.map((item,index)=>{
                                                let _clsName = 'coment-stars stars'+item.satisfaction_star
                                                let buy = item.buy
                                                if(item.type == 1){
                                                    if(item.satisfaction_star>0){
                                                        return (
                                                            <div className="coment-list" key={index}>
                                                                <div className="coment-header clearfix">
                                                                    <CommonLogo src={buy.headimgurl} className="fl" />
                                                                    <span className="coment-user fl">{buy.name}</span>
                                                                    <span className="coment-time fr">{item.created_at}</span>
                                                                </div>
                                                                <div className="coment-star">
                                                                    <span className={_clsName}></span>
                                                                </div>
                                                                <div className="coment-info">{item.content}</div>
                                                                <div className="coment-replay-wrapper">
                                                                    <div className="coment-simple">购买时间:{item.created_at}</div>
                                                                    <div className="coment-simple">规格分类:{item.order ? item.order.feature_main : ''} {item.order ? item.order.feature_sub : ''}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className="coment-list" key={index}>
                                                                <div className="coment-info-add">
                                                                    <div className="coment-info">
                                                                        [追加]{item.content}
                                                                    </div>
                                                                    <div className="coment-replay-wrapper">
                                                                        <div className="coment-simple">追评时间:{item.created_at}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }else{
                                                    return (
                                                        <div className="coment-list" key={index}>
                                                            <div className="coment-trade-replay">
                                                                <div className="coment-trade-replay-info">
                                                                    [商家]{item.content}
                                                                </div>
                                                                <p>反馈时间:{item.created_at}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                            <p id="loading-more" style={{display:this.state.loadMore?'block':'none'}}>{this.state.noMore?"已全部加载":"评论加载中···"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Recommend />
                    <div className="vipcode" style={this.state.vipcode?{'display':'block'}:{'display':'none'}}>
                        <img src="http://s.51lianying.com/images/xds/trade/codevip2.jpg" alt="" />
                    </div>
                </div>
                <ProductDetailFooter pathname={pathname} userId={this.props.state.userId} detailId={this.state.id}/>
                <ProductSkuSelect detailId={this.state.id} />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(ProductDetails);
