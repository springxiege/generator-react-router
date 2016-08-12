'use strict';
import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {
    AddCollect,
    ShowAndHideSelectSku, 
    CancelCollect
} from '../actions/ActionFuncs'
class ProductPriceAndFuncs extends React.Component {
    _doCollect(e) {
        if(!window.config.isWX){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                    return false;
                }else{
                    if(!tradeStore.token){
                        window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                        return false;
                    }
                }
            }else{
                alert('This browser does not supports localStorage')
                return false;
            }
        }
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
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:function(error){
                if(_param._method){
                    $.tips('取消收藏失败，请重试')
                }else{
                    $.tips('收藏失败，请重试')
                }
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    if(_param._method){
                        this.props.dispatch(CancelCollect());
                        $.tips('取消收藏成功')
                    }else{
                        this.props.dispatch(AddCollect());
                        $.tips('收藏成功')
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
            this.props.dispatch(ShowAndHideSelectSku())
            return false;
        }
        goods_id = state.data.goods_addon[selected].goods_id;
        addon_id = state.data.goods_addon[selected].addon[subselected||0].id;
        if(!window.config.isWX){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                    return false;
                }else{
                    if(!tradeStore.token){
                        window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                        return false;
                    }
                }
            }else{
                alert('This browser does not supports localStorage')
                return false;
            }
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
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                $.tips('加入购物车失败',1200,function(){
                    config.ProcessError(error);
                })
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    $.tips('加入购物车成功')
                }
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
