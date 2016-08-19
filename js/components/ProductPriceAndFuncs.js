'use strict';
import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {
    AddCollect,
    ShowAndHideSelectSku, 
    CancelCollect
} from '../actions/ActionFuncs'
import addToShopCart from '../event/event.addToShopCart'
class ProductPriceAndFuncs extends React.Component {
    constructor(){
        super();
        this.addToShopCart = addToShopCart.bind(this);
    }
    componentDidMount(){
        
    }
    render() {
        let _collect = this.props.collect;
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={e=>this.addToShopCart(1)}><span title="购物车"></span></div>
                <div className={_collect?"main-collect-icon collected fr":"main-collect-icon fr"} onClick={this.props.onClick} ref="collect"><span title="收藏"></span></div>
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
