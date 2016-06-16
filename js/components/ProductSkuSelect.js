'use strict';
// SKU 属性选择
import '../../css/main-sku.css'
import React from 'react';
import {connect} from 'react-redux'
import { 
    GoodsSelectSku , 
    GoodsSelectSkuSub ,
    GoodsSelectedSku,
    ShowAndHideSelectSku, 
    Increment , 
    Decrement 
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

        // setTimeout(()=>{
        //     this.props.dispatch(GoodsSelectedSku())
        // })

    }
    _subhandleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        this.props.dispatch(GoodsSelectSkuSub(index))
        // setTimeout(()=>{
        //     this.props.dispatch(GoodsSelectedSku(this.props.state))
        // })
    }
    _Increment(e){
        this.props.dispatch(Increment())
    }
    _Decrement(e){
        this.props.dispatch(Decrement())
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
                                            <span className="number-up fl" onClick={e=>this._Increment(e)} >+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-price clearfix">
                                    <div className="main-price-module fl">合计：<span className="main-money">{_GoodsSelectSku.price}元</span><span>(含快递费{_data.fare}元)</span></div>
                                </div>
                            </div>
                            <div className="sku-count clearfix">
                                <div className="add-to-cart fl">加入购物车</div>
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
