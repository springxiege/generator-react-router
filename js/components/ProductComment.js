'use strict';
// 详情页评论
import '../../css/main-comment.css'
import React from 'react';
import {connect} from 'react-redux'
import {GetGoodComment,GetBadComment} from '../actions/ActionFuncs'
class ProductComment extends React.Component {
    componentDidMount(){
        // let _id  = this.props.params.DetailId || '1'
        // this.serverRequest = $.ajax({
        //     url: 'http://xds.51lianying.local/goods/comment/'+_id,
        //     type: 'GET',
        //     dataType: 'json',
        //     data: {},
        //     error:(error)=>{

        //     },
        //     success:(data)=>{
        //         console.log(data)
        //     }
        // })
        
    }
    componentWillUnmount() {
          // this.serverRequest.abort()
    }
    _Get_Good_Comment(e){
        if(e.target.className == 'cur'){return false;}
        this.props.dispatch(GetGoodComment())
    }
    _Get_Bad_Comment(e){
        if(e.target.className == 'cur'){return false;}
        this.props.dispatch(GetBadComment())
    }
    render() {
        let _status = this.props.state.status
        let _li = this.props.state.data[_status].map(function(item,index){
            let _clsName = 'coment-stars stars'+item.comment_start
            return (
                <div className="coment-list" key={index}>
                    <div className="coment-header clearfix">
                        <img src={item.user_image} alt="用户头像" className="fl" />
                        <span className="coment-user fl">{item.user_name}</span>
                        <span className="coment-time fr">{item.updated_at}</span>
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
            <div className="main-product-comment swiper-slide">
                <div className="coment-tab">
                    <ul>
                        <li className={_status==0?"cur":""} onClick={e => this._Get_Good_Comment(e)}>好评<span>(12306)</span></li>
                        <li className={_status==1?"cur":""} onClick={e => this._Get_Bad_Comment(e)}>差评<span>(11)</span></li>
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
