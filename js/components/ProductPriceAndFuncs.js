'use strict';
import '../../css/main-price.css';
import React from 'react';
import ReactDOM from 'react-dom';
export default class ProductPriceAndFuncs extends React.Component {
    doCollect(e) {
        var $this = $(e.target);
        if (!$this.hasClass('collected')) {
            $this.addClass('collected').removeClass('uncollected');
        } else {
            $this.addClass('uncollected').removeClass('collected');
        }
    }
    addToShoppingCart(e) {
        ReactDOM.render(<ProductSkuSelect sku={ProductDate.goods_addon} />, document.getElementById('sku'));
    }
    render() {
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={this.addToShoppingCart}><span title="购物车"></span></div>
                <div className="main-collect-icon fr" onClick={this.doCollect} ref="collect"><span title="收藏"></span></div>
            </div>
        )
    }
};