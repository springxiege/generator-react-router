'use strict';
// 商品详情tab
import React from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import { 
    GetComment
} from '../actions/ActionFuncs'
import ProductDetailsChild from './ProductDetailsChild.js';
import ProductForSale from './ProductForSale.js';
import CommonLogo from './CommonLogo'
import scrollLoading from '../event/event.scrollLoading'
import getCommentList from '../event/event.getCommentList'
import LoadMorePageData from '../event/event.LoadMorePageData'
import setFixed from '../event/event.setFixed'
class ProductTabs extends React.Component {
    constructor(){
        super();
        this.state = {
            target: 0,
            type:0,
            fixed:false,
            loadComment:true,
            pagesize:10,
            flag:true,
            noMore:false,
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
        this.setFixed = setFixed.bind(this);
        this.scrollLoading = scrollLoading.bind(this);
        this.getCommentList = getCommentList.bind(this);
        this.LoadMorePageData = LoadMorePageData.bind(this);
    }
    componentDidMount() {
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
                        _name = "评价" + "<span>(" + _comment_count + ")</span>"
                        break;
                    default:
                        break;
                }
                return '<li class="' + clsName +'">' + _name + '</li>';
            },
            onSlideChangeEnd:(swiper)=>{
                if(swiper.activeIndex == 2 && this.state.loadComment){
                    // 传入0表示获取全部评论列表
                    _this.getCommentList(_this.props.data.id,0);
                    window.addEventListener('scroll',this.LoadMorePageData);
                }else{
                    window.removeEventListener('scroll',this.LoadMorePageData);
                }
            }
        });
        window.addEventListener('scroll',this.setFixed);
        window.addEventListener('scroll',this.scrollLoading);
        this.setState({
            target: $(findDOMNode(this.refs.ProductFixed)).offset().top
        })
    }
    componentWillUnmount() {
        // 销毁Swiper
        let _this = this;
        window.removeEventListener('scroll',this.setFixed);
        window.removeEventListener('scroll',this.scrollLoading);
        window.removeEventListener('scroll',this.LoadMorePageData);
        this.productTabs.destroy(false);
    }
    componentDidUpdate(){
        this.scrollLoading();
        setTimeout(()=>{
            this.productTabs.update();
        },600)
    }
    render() {
        let _state = this.props.state
        let _data = _state.data
        let _good_comment = _data.coumt_commet.favorable_comment
        let _bad_comment = _data.coumt_commet.bad_review
        let CommentData = _state.CommentList
        let CommentDataArray = CommentData.data
        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab" ref="ProductFixed">
                        <ul className="main-tab-page clearfix" ref="productTabsPage"></ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            {/* 商品详情 */}
                            <ProductDetailsChild content={this.props.data.content} />
                            {/* 产品售后 */}
                            <ProductForSale snum={this.props.data.snum} madeby={this.props.data.made_by} expire={this.props.data.expire} maintain={this.props.data.maintain} deliver_address={this.props.data.deliver_address} />
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
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(ProductTabs);