'use strict';
// SKU 属性选择
import '../../css/main-sku.css'
import $ from 'jquery'
import React from 'react';
import {connect} from 'react-redux'
import { 
    GoodsSelectSku , 
    GoodsSelectSkuSub ,
    GoodsSelectedSku,
    ShowAndHideSelectSku, 
    countIncrement , 
    countDecrement 
} from '../actions/ActionFuncs'

class ProductSkuSelect extends React.Component {
    _closeSKU(){
        this.props.dispatch(ShowAndHideSelectSku())
    }
    // 规格一选择
    _handleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        this.props.dispatch(GoodsSelectSku(index))

        setTimeout(()=>{
            this.props.dispatch(GoodsSelectedSku())
        })

    }
    // 规格二选择
    _subhandleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        if(this.props.state.GoodsSelectSku.selected === null){
            alert('请先选择规格一')
            return false;
        }
        this.props.dispatch(GoodsSelectSkuSub(index))
        setTimeout(()=>{
            this.props.dispatch(GoodsSelectedSku())
        })
    }
    _Increment(e){
        let current = this.props.state.GoodsSelectSku.count
        let state = this.props.state
        let stock = state.data.goods_addon[(state.GoodsSelectSku.selected||0)].stock
        if(state.GoodsSelectSku.selected !== null && state.GoodsSelectSku.subselected !== null){
            stock = state.data.goods_addon[state.GoodsSelectSku.selected].addon[state.GoodsSelectSku.subselected].stock
        }
        if(parseInt(current) < parseInt(stock)){
            this.props.dispatch(countIncrement())
        }
    }
    _Decrement(e){
        let current = this.props.state.GoodsSelectSku.count
        if(parseInt(current) > 1){
            this.props.dispatch(countDecrement())
        }
        
    }
    addtoCart(e){
        let state          = this.props.state
        let GoodsSelectSku = state.GoodsSelectSku
        let selected       = GoodsSelectSku.selected
        let subselected    = GoodsSelectSku.subselected
        let goods_id       = null
        let addon_id       = null
        let amount         = GoodsSelectSku.count
        if(selected === null || subselected ===null){
            alert('请选择规格')
            return false;
        }
        goods_id = state.data.goods_addon[selected].goods_id
        addon_id = state.data.goods_addon[selected].addon[subselected].id
        $.ajax({
            url: 'http://xds.51lianying.local/goods/cart',
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
        let _state          = this.props.state
        let _data           = _state.data
        let _GoodsSelectSku = _state.GoodsSelectSku
        let _count          = _GoodsSelectSku.count
        let _selected       = _GoodsSelectSku.selected
        let _subselected    = _GoodsSelectSku.subselected
        let subskudata      = _data.goods_addon?_data.goods_addon[(_selected||0)].addon:[]
        let _clsName        = !_GoodsSelectSku.isvisible?"sku-pop":"sku-pop selecting"
        
        let sku = (_data.goods_addon||[]).map((item,index)=>{

            return (
                <li className={_selected == index ? "cur" : ""} onClick={e=>this._handleClick(e)} data-stock={item.stock} data-index={index} key={index}>{item.feature_main}</li>
            )
        })
        let subsku = !subskudata.length?"":subskudata.map((item,index)=>{
            return (
                <li className={_subselected == index ? "cur" : ""} onClick={e=>this._subhandleClick(e)} data-stock={item.stock} data-index={index} key={index}>{item.feature_sub}</li>
            )
        })
    

        let subskuwrap = subskudata.length > 0 ? (
            <div className="sku-info clearfix">
                <span className="sku-prop-name fl">规格二</span>
                <div className="sku-prop-item">
                    <ul className="clearfix">
                        {subsku}
                    </ul>
                </div>
            </div>
        ) : '';
        return (
            <section className={_clsName} ref="skupop">
                <section className="sku-content">
                    <div className="sku-module">
                        <div className="sku-main">
                            <span className="sku-close" onClick={e=>this._closeSKU(e)}><a href="javascript:;">&times;</a></span>
                            <div className="sku-item">
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">规格一</span>
                                    <div className="sku-prop-item">
                                        <ul className="clearfix">
                                            {sku}
                                        </ul>
                                    </div>
                                </div>
                                {subskuwrap}
                                <div className="sku-info-num clearfix">
                                    <span className="sku-prop-name fl">数&emsp;量</span>
                                    <div className="sku-prop-item">
                                        <div className="sku-number clearfix">
                                            <span className="number-down fl" onClick={e=>this._Decrement(e)}>-</span>
                                            <input type="number" value={_count} min="1" max="10" ref="input" readOnly className="number-input fl" />
                                            <span className="number-up fl" onClick={e=>this._Increment(e)}>+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-price clearfix">
                                    <div className="main-price-module fl">合计：<span className="main-money">{_GoodsSelectSku.price}元</span><span>(含快递费{_data.fare}元)</span></div>
                                </div>
                            </div>
                            <div className="sku-count clearfix">
                                <div className="add-to-cart fl" onClick={e=>this.addtoCart(e)}>加入购物车</div>
                                <span className="buy-right-now fr">立即购买</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(ProductSkuSelect);
