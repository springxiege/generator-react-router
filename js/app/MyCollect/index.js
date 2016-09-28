/**
 * 我的收藏夹
 */
import React from 'react'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import {
    getCollectList,
    CancelCollect,
    getMoreCollectList
} from './constants'
// import CollectList from '../components/CollectList'
import CopyRight from '../../components/CopyRight'
import ReturnTop from '../../components/ReturnTop'
import Recommend from '../../components/Recommend'
import CommonImage from '../../components/CommonImage'
import CommonLogo from '../../components/CommonLogo'
import LoadMorePageData from '../../event/event.LoadMorePageData'
import scrollLoading from '../../event/event.scrollLoading'
class MyCollect extends React.Component {
    constructor(){
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
            url: config.url + '/orders/prepayment',
            pagesize: 10,
            page: 2, 
            flag: true, 
            noMore: false,
            winHeight: $(window).height(),
            callback: function(pdata){ 
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMoreCollectList(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
        };
        this.LoadMorePageData = LoadMorePageData.bind(this);
        this.scrollLoading = scrollLoading.bind(this);
    }
    componentDidMount(){
        document.title = '我的收藏';
        let _this = this;
        this.serverRequest = $.ajax({
            url: config.url + '/goods/collect',
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize:_this.state.pagesize,
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
                $.loading.hide();
                if(parseInt(data.code) == 0){
                    if(data.data.data){
                        this.props.dispatch(getCollectList(data.data))
                    }
                    if(parseInt(data.data.last_page) <= 1){
                        $('#loading-more').html('已全部加载')
                    }else{
                        window.addEventListener('scroll',_this.LoadMorePageData);
                    };
                    if(parseInt(data.data.last_page) === 0){
                        $('#loading-more').hide();
                    }
                }
            },
            complete:function(){
                $.loading.hide();
                _this.scrollLoading();
                window.addEventListener('scroll',_this.scrollLoading);
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort() 
        window.removeEventListener('scroll',this.LoadMorePageData);
        window.removeEventListener('scroll',this.scrollLoading);
    }
    cancelCollect(e,id){
        let $target = $(findDOMNode(e.target)).closest('.main-mycollect-list');
        let $parent = $target.closest('.main-mycollect');
        $.confirm({
            content:'取消关注后该内容将不在此显示',
            okBtn:function(){
                $.ajax({
                    url: config.url + '/goods/collect/'+id,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _method:'DELETE'
                    },
                    beforeSend:(request)=>{
                        config.setRequestHeader(request);
                    },
                    error:(error)=>{
                        config.ProcessError(error);
                    },
                    success:(data)=>{
                        if(parseInt(data.code)==0){
                            $target.remove();
                            let len = $parent.find('.main-mycollect-list').length
                            if(!len){
                                $parent.append('<div class="main0module main-mycollect-list no-list">'
                                                    +'<p>收藏夹空空如也</p>'
                                                    +'<p>快去51推荐收藏吧</p>'
                                                +'</div>');
                                $parent.siblings('.main-mycollect-header').find('span').html(len)
                            }else{
                                $parent.siblings('.main-mycollect-header').find('span').html(len)
                            }
                        }
                    }
                })
            }
        })
        
    }
    render(){
        let _data = this.props.state,collectHtml=0;
        if(!_data.data.data.length){
            collectHtml = (
                <div className="main0module main-mycollect-list no-list">
                    <p>收藏夹空空如也</p>
                    <p>快去51推荐收藏吧</p>
                </div>
            )
        }else{
            collectHtml = _data.data.data.map((item,index) => {
                let _link = '/ProductDetails/'+item.goods.id
                return (
                    <div className="main-module main-mycollect-list" key={index}>
                        <div className="main-mycollect-funcs clearfix">
                            <CommonLogo src={item.goods.get_user_profile.shop_logo}  className="fl" />
                            <h4 className="fl">{item.goods.get_user_profile.shop_name}</h4>
                            <span className="fr" onClick={e=>this.cancelCollect(e,item.id)}>取消收藏</span>
                        </div>
                        <div className="main-mycollect-item">
                            <a href={item.goods.goodsLink} className="clearfix">
                                <CommonImage src={item.goods.goods_images} className="fl" />
                                <div className="main-mycollect-info">
                                    <h5>{item.goods.title}</h5>
                                    <p>&yen;{item.price} {/*<span>&yen;{item.price}</span>*/}</p>
                                </div>
                            </a>
                        </div>
                        <div className="main-mycollect-footer clearfix">
                            <span className="fl">收藏时间：{item.created_at}</span>
                            <a href={item.goods.goodsLink} className="fr">去购买</a>
                        </div>
                    </div>
                )
            })
        }
        return (
                <div className="main">
                    {/*<CollectList data={this.props.state} />*/}
                    <div className="main-module-tree main-mycollect-header">
                        <h3 className="main-collect-title">收藏了<span>{_data.data.total}</span>个宝贝</h3>
                    </div>
                    <div className="main-mycollect">
                        {collectHtml}
                    </div>
                    <Recommend />
                    <CopyRight clsName={"fixed"} />
                    <ReturnTop />
                </div>
        )
    }
};
function select(state){
    return {state:state.MyCollect};
}
export default connect(select)(MyCollect);
