'use strict';
import '../../css/main-price.css';
import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {AddCollect,CancelCollect} from '../actions/ActionFuncs'
class ProductPriceAndFuncs extends React.Component {
    _doCollect(e) {
        let _id     = this.props.state.data.id||'1'
        let _status = e.target.getAttribute('data-status');
        let _param  = {}
        if(parseInt(_status) == 1){
            _param._method = 'delete'
        }
        $.ajax({
            url: config.url + '/goods/collect/'+_id,
            type: 'POST',
            dataType: 'json',
            data: _param,
            error:function(error){
                console.error(error)
                if(_param._method){
                    alert('取消收藏失败，请重试')
                }else{
                    alert('收藏失败，请重试')
                }
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    if(_param._method){
                        this.props.dispatch(CancelCollect());
                    }else{
                        this.props.dispatch(AddCollect());
                    }
                }
            }
        })
    }

    addToShoppingCart(e) {
        let state          = this.props.state
        let GoodsSelectSku = state.GoodsSelectSku
        let selected       = GoodsSelectSku.selected
        let subselected    = GoodsSelectSku.subselected
        let goods_id       = null
        let addon_id       = null
        let amount         = GoodsSelectSku.count
        if(selected === null && subselected ===null){
            alert('请选择规格')
            return false;
        }
        goods_id = state.data.goods_addon[selected].goods_id
        if(subselected===null){
            addon_id = state.data.goods_addon[selected].id
        }else{
            addon_id = state.data.goods_addon[selected].addon[subselected].id
        }
        $.ajax({
            url: config.url + '/goods/cart',
            type: 'POST',
            dataType: 'json',
            data: {
                goods_id:goods_id,
                addon_id:addon_id,
                amount:amount
            },
            error:(error)=>{
                alert('加入购物车失败')
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    alert('加入购物车成功')
                }
                console.log(data)
            }
        })
    }
    render() {
        let _status = this.props.state.Collect;
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={e=>this.addToShoppingCart(e)}><span title="购物车"></span></div>
                <div className={_status?"main-collect-icon collected fr":"main-collect-icon fr"} onClick={e => this._doCollect(e)} ref="collect" data-id='1' data-status={_status}><span title="收藏"></span></div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(ProductPriceAndFuncs);
