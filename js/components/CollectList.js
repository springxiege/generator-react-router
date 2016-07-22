import React,{Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import {getCollectList,CancelCollect} from '../actions/ActionFuncs'

class CollectList extends Component {
    componentDidMount(){
        this.serverRequest = $.ajax({
            url: config.url + '/goods/collect',
            type: 'GET',
            dataType: 'json',
            data: {},
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) == 0){
                    this.props.dispatch(getCollectList(data.data))
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    cancelCollect(e,id){
        console.log(id)
        $.ajax({
            url: config.url + '/goods/collect/'+id,
            type: 'POST',
            dataType: 'json',
            data: {
                _method:'DELETE'
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code)==0){

                }
            }
        })
        
    }
    render(){
        console.log(this.props.state)
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
                            <img src="images/3.jpg" alt="" className="fl" />
                            <h4 className="fl">王小二时尚卖手</h4>
                            <span className="fr" onClick={e=>this.cancelCollect(e,item.id)}>取消收藏</span>
                        </div>
                        <div className="main-mycollect-item">
                            <Link to={_link} className="clearfix">
                                <img src="images/7.jpg" alt="" className="fl"/>
                                <div className="main-mycollect-info">
                                    <h5>{item.goods.title}</h5>
                                    <p>&yen;{item.price} <span>&yen;{item.price}</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className="main-mycollect-footer clearfix">
                            <span className="fl">收藏时间：{item.created_at}</span>
                            <Link to={_link} className="fr">去购买</Link>
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
