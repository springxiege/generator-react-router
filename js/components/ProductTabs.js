'use strict';
// 商品详情tab
import React from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import { 
    GetComment ,
    GetGoodComment,
    GetBadComment,
    GetMoreComment,
    GetMoreGoodComment,
    GetMoreBadComment
} from '../actions/ActionFuncs'
import ProductDetailsChild from './ProductDetailsChild.js';
import ProductForSale from './ProductForSale.js';
// import ProductComment from './ProductComment.js';
class ProductTabs extends React.Component {
    constructor(){
        super();
        this.state = {
            activeIndex: 0,
            type:0,
        };
        this.loadMorePage = this.loadMorePage.bind(this);
    }
    componentDidMount() {
        let _this = this;
        // 先销毁Swiper，以防重复创建Swiper并更新Swiper;
        let pagination = findDOMNode(this.refs.productTabsPage);
        this.productTabs&&this.productTabs.destroy&&this.productTabs.destroy(false);
        this.productTabs = new Swiper(findDOMNode(this.refs.productTabs), {
            initialSlide: _this.state.activeIndex,
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
                if(swiper.activeIndex == 2){
                    let _id  = this.props.state.data.id || '1'
                    let length = this.props.state.CommentList.list.data.data.length
                    if(length){return false;}
                    $.ajax({
                        url: config.url + '/goods/comment/'+_id,
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        beforeSend:function(request){
                            if(config.head!=''){
                                request.setRequestHeader("Authorization", "Bearer " + config.head);
                            }
                        },
                        error:(error)=>{
                            console.error(error)
                        },
                        success:(data)=>{
                            if(parseInt(data.code)==0){
                                this.props.dispatch(GetComment(data))
                                setTimeout(()=>{
                                    swiper.updateContainerSize()
                                    swiper.updateSlidesSize();
                                    swiper.updateProgress();
                                    swiper.updatePagination();
                                    swiper.updateClasses();
                                    swiper.update();
                                },500)
                            }
                        }
                    })
                }
            }
        });
    }
    componentWillUnmount() {
        // 销毁Swiper
        this.productTabs.destroy(false)
    }
    componentDidUpdate(){
        let activeIndex = this.productTabs.activeIndex;
        this.productTabs.updateContainerSize()
        this.productTabs.updateSlidesSize();
        this.productTabs.updateProgress();
        this.productTabs.updatePagination();
        this.productTabs.updateClasses();
        this.productTabs.update();
        this.productTabs.height = $(findDOMNode(this.refs.productTabs)).find('.swiper-slide').eq(activeIndex).height();
    }
    loadMorePage(){

    }
    _Get_Good_Comment(e){
        let _this = this
        if(e.target.className == 'cur'){return false;}
        let $target = $(findDOMNode(e.target))
        let _id  = this.props.state.id || '1'
        $.ajax({
            url: config.url + '/goods/comment/'+_id+'?summary=1',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    $target.addClass('cur').siblings('li').removeClass('cur');
                    _this.props.dispatch(GetGoodComment(data));
                    _this.setState({
                        type:1
                    })
                }
            }
        })
    }
    _Get_Bad_Comment(e){
        let _this = this
        if(e.target.className == 'cur'){return false;}
        let $target = $(findDOMNode(e.target))
        let _id  = this.props.state.id || '1'
        $.ajax({
            url: config.url + '/goods/comment/'+_id+'?summary=2',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    $target.addClass('cur').siblings('li').removeClass('cur');
                    _this.props.dispatch(GetBadComment(data));
                    _this.setState({
                        type:2
                    })
                }
            }
        })
    }
    render() {
        let _state = this.props.state
        let _data = _state.data
        let _good_comment = _data.coumt_commet.favorable_comment
        let _bad_comment = _data.coumt_commet.bad_review
        let CommentData = _state.CommentList
        let _status = CommentData.status
        let CommentDataArray = []
        switch (parseInt(_status)){
            case 0:
                CommentDataArray = CommentData.good_list
                break;
            case 1:
                CommentDataArray = CommentData.bad_list
                break;
            case 2:
                CommentDataArray = CommentData.list
                break;
        }
        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab">
                        <ul className="main-tab-page clearfix" ref="productTabsPage"></ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            <ProductDetailsChild content={this.props.data.content} />
                            <ProductForSale snum={this.props.data.snum} madeby={this.props.data.made_by} expire={this.props.data.expire} maintain={this.props.data.maintain} deliver_address={this.props.data.deliver_address} />
                            {/* 商品详情评论列表 */}
                            <div className="main-product-comment swiper-slide">
                                <div className="coment-tab">
                                    <ul>
                                        <li className={this.state.type == 1 && this.state.type != 0 ? "cur" : ""} onClick={e => this._Get_Good_Comment(e)}>好评<span>({_good_comment})</span></li>
                                        <li className={this.state.type == 2 && this.state.type != 0 ? "cur" : ""} onClick={e => this._Get_Bad_Comment(e)}>差评<span>({_bad_comment})</span></li>
                                    </ul>
                                </div>
                                <div className="coment-container">
                                    {!CommentDataArray.data.data.length?"":CommentDataArray.data.data.map((item,index)=>{
                                        let _clsName = 'coment-stars stars'+item.satisfaction_star
                                        let buy = item.buy
                                        return (
                                            <div className="coment-list" key={index}>
                                                <div className="coment-header clearfix">
                                                    <img src={buy.headimgurl||'/images/shop_logo.gif'} alt={buy.id} className="fl" />
                                                    <span className="coment-user fl">{buy.name}</span>
                                                    <span className="coment-time fr">{item.created_at}</span>
                                                </div>
                                                <div className="coment-star">
                                                    <span className={_clsName}></span>
                                                </div>
                                                <div className="coment-info">{item.content}</div>
                                                <div className="coment-replay-wrapper">
                                                    <div className="coment-simple">购买时间:{item.created_at}</div>
                                                    <div className="coment-simple">颜色分类:{item.type}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {/*<ProductComment good_count={_good_comment} bad_count={_bad_comment} />*/}
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