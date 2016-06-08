import '../../css/main-collect.css'
import React,{Component} from 'react';
import {connect} from 'react-redux'
import {CancelCollect} from '../actions/ActionFuncs'

class CollectList extends Component {

    render(){
        console.log(this.props.state)
        let _data = this.props.state,collectHtml;
        if(parseInt(_data.code) == 0){
            if(!_data.data.data.data.length){
                collectHtml = (
                    <div className="main0module main-mycollect-list no-list">
                        <p>收藏夹空空如也</p>
                        <p>快去51推荐收藏吧</p>
                    </div>
                )
            }else{
                collectHtml = _data.data.data.data.map((item,index) => {
                    return (
                        <div className="main-module main-mycollect-list" key={index}>
                            <div className="main-mycollect-funcs clearfix">
                                <img src="images/3.jpg" alt="" className="fl" />
                                <h4 className="fl">王小二时尚卖手</h4>
                                <span className="fr" onClick={this.cancelCollect}>取消收藏</span>
                            </div>
                            <div className="main-mycollect-item">
                                <a href="###" className="clearfix">
                                    <img src="images/7.jpg" alt="" className="fl"/>
                                    <div className="main-mycollect-info">
                                        <h5>{item.goods.title}</h5>
                                        <p>&yen;{item.price} <span>&yen;{item.price}</span></p>
                                    </div>
                                </a>
                            </div>
                            <div className="main-mycollect-footer clearfix">
                                <span className="fl">已收藏10天</span>
                                <a href="###" className="fr">去购买</a>
                            </div>
                        </div>
                    )
                })
            }
        }
        return (
            <div className="main">
                <div className="main-module-tree main-mycollect-header">
                    <h3 className="main-collect-title">收藏了<span>10</span>个宝贝</h3>
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
