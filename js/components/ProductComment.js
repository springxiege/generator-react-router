'use strict';
// 详情页评论
import React from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {GetComment,GetGoodComment,GetBadComment} from '../actions/ActionFuncs'
class ProductComment extends React.Component {
    componentDidMount(){
        
    }
    componentWillUnmount() {
          
    }
    _Get_Good_Comment(e){
        if(e.target.className == 'cur'){return false;}
        let $target = $(findDOMNode(e.target))
        let _id  = this.props.state.id || '1'
        $.ajax({
            url: config.url + '/goods/comment/'+_id+'?summary=1',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{

            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    $target.addClass('cur').siblings('li').removeClass('cur');
                    this.props.dispatch(GetGoodComment(data))
                }
            }
        })
        
        
    }
    _Get_Bad_Comment(e){
        if(e.target.className == 'cur'){return false;}
        let $target = $(findDOMNode(e.target))
        let _id  = this.props.state.id || '1'
        $.ajax({
            url: config.url + '/goods/comment/'+_id+'?summary=2',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{

            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    $target.addClass('cur').siblings('li').removeClass('cur');
                    this.props.dispatch(GetBadComment(data))
                }
            }
        })
    }
    render() {
        let state = this.props.state
        let _status = state.status
        let data = null
        switch (parseInt(_status)){
            case 0:
                data = state.good_list
                break;
            case 1:
                data = state.bad_list
                break;
            case 2:
                data = state.list
                break;
        }
        let _li = !data.data.data.length ? "" : data.data.data.map((item,index)=>{
            let _clsName = 'coment-stars stars'+item.satisfaction_star
            let buy = item.buy
            return (
                <div className="coment-list" key={index}>
                    <div className="coment-header clearfix">
                        <img src={buy.headimgurl} alt={buy.id} className="fl" />
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
        })
        return (
            <div className="main-product-comment swiper-slide swiper-no-swiping">
                <div className="coment-tab">
                    <ul>
                        <li onClick={e => this._Get_Good_Comment(e)}>好评<span>({this.props.good_count})</span></li>
                        <li onClick={e => this._Get_Bad_Comment(e)}>差评<span>({this.props.bad_count})</span></li>
                    </ul>
                </div>
                <div className="coment-container">
                    {_li}
                </div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail.CommentList
    }
}
export default connect(select)(ProductComment);
