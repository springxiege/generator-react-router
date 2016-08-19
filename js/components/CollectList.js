import React,{Component} from 'react';
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'
import { Link } from 'react-router';
import {
    getCollectList,
    CancelCollect
} from '../actions/ActionFuncs'
import CommonImage from './CommonImage'
import CommonLogo from './CommonLogo'
class CollectList extends Component {
    componentDidMount(){
        
    }
    componentWillUnmount() {
        
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
        let _data = this.props.data,collectHtml=0;
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
                                    <p>&yen;{item.price} <span>&yen;{item.price}</span></p>
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
                <div className="main-module-tree main-mycollect-header">
                    <h3 className="main-collect-title">收藏了<span>{_data.data.total}</span>个宝贝</h3>
                </div>
                <div className="main-mycollect">
                    {collectHtml}
                </div>
            </div>


        )
    }
}


function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.MyCollect
    }
}
export default connect(select)(CollectList);
