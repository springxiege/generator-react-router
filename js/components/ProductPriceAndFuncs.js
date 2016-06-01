'use strict';
import '../../css/main-price.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import ProductSkuSelect from './ProductSkuSelect'
import ProductDate from '../common/ProductDate'
import {doCollect} from '../actions/ActionFuncs'
class ProductPriceAndFuncs extends React.Component {
    _doCollect(e) {
        console.log(e.target.className)
        console.log(this.props.state)
        this.props.dispatch(doCollect(1));
    }
    addToShoppingCart(e) {
        ReactDOM.render(<ProductSkuSelect sku={ProductDate.goods_addon} />, document.getElementById('sku'));
    }
    render() {
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={this.addToShoppingCart}><span title="购物车"></span></div>
                <div className="main-collect-icon fr" onClick={this._doCollect.bind(this)} ref="collect"><span title="收藏"></span></div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state
    }
}
export default connect(select)(ProductPriceAndFuncs);
