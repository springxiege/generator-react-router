'use strict';
// SKU 属性选择
import '../../css/main-sku.css'
import React from 'react';
import {connect} from 'react-redux'
import { GoodsSelectSku , GoodsSelectSkuSub , Increment , Decrement } from '../actions/ActionFuncs'
class ProductSkuSelect extends React.Component {

    // 规格一选择
    _handleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        this.props.dispatch(GoodsSelectSku(index))

    }
    _subhandleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        this.props.dispatch(GoodsSelectSkuSub(index))
    }
    _Increment(e){
        this.props.dispatch(Increment())
    }
    _Decrement(e){
        this.props.dispatch(Decrement())
    }
    render() {
        let _this = this;
        let _count = _this.props.state.GoodsSelectSku.count
        let data = _this.props.state.GoodsSelectSku.goods_addon
        let _selected = _this.props.state.GoodsSelectSku.selected
        let sku = data.map(function(item, index) {
            let clsName = (_selected == index ? "cur" : "");
            return (
                <li className={clsName} onClick={e=>_this._handleClick(e)} data-stock={item.stock} data-index={index} key={index}>{item.feature_main}</li>
            )
        });
        let subdata = _this.props.state.GoodsSelectSku.addon
        let _subselected = _this.props.state.GoodsSelectSku.subselected
        let subsku = subdata[_selected].length && subdata[_selected].map(function(item, index) {
            let clsName = (_subselected == index ? "cur" : "");
            return (
                <li className={clsName} onClick={e=>_this._subhandleClick(e)} data-stock={item.stock} data-index={index} key={index}>{item.feature_sub}</li>
            )
        });

        let subskuwrap = subdata[_selected].length > 0 ? (
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
            <section className="sku-pop">
                <section className="sku-content">
                    <div className="sku-module">
                        <div className="sku-main">
                            <span className="sku-close" onClick={this.closeSKU}><a href="javascript:;">&times;</a></span>
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
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">数&emsp;量</span>
                                    <div className="sku-prop-item">
                                        <div className="sku-number clearfix">
                                            <span className="number-down fl" onClick={e=>_this._Increment(e)}>-</span>
                                            <input type="number" value={_count} min="1" max="10" ref="input" className="number-input fl" />
                                            <span className="number-up fl" onClick={e=>_this._Decrement(e)} >+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-price clearfix">
                                    <div className="main-price-module fl"><span className="yen">&yen;</span>6299.00-8399.00</div>
                                </div>
                                <div className="main-oringinal-price clearfix">
                                    <div className="main-oringinal-module fl">原价:<span>699.00</span></div>
                                    <div className="main-fee fr">快递:<span>20.00元</span></div>
                                </div>
                            </div>
                            <div className="sku-count clearfix">
                                <div className="sku-count-fee fl">
                                    <span>合计：</span>198654.00元
                                </div>
                                <span className="add-to-cart fr">加入购物车</span>
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
      state: state
    }
}
export default connect(select)(ProductSkuSelect);
