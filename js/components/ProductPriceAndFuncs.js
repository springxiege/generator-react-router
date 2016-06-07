'use strict';
import '../../css/main-price.css';
import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {AddCollect,CancelCollect} from '../actions/ActionFuncs'
class ProductPriceAndFuncs extends React.Component {
    _doCollect(e) {
        let _status = e.target.getAttribute('data-status');
        switch (parseInt(_status)) {
        case 0:
            this.props.dispatch(AddCollect(1));
            break;
        case 1:
            this.props.dispatch(CancelCollect(1));
            break;
        default:
            this.props.dispatch(AddCollect(1));
            break;
        }
        // console.log(this.props.state)
    }

    addToShoppingCart(e) {

    }
    render() {
        let _status = this.props.state.status;
        let _cls = this.props.state.clsName;
        return (
            <div className="main-price clearfix">
                <div className="main-price-module fl"><span className="yen">&yen;</span>{this.props.price}</div>
                <div className="main-buycart-icon fr" onClick={this.addToShoppingCart}><span title="购物车"></span></div>
                <div className={_cls} onClick={e => this._doCollect(e)} ref="collect" data-id='1' data-status={_status}><span title="收藏"></span></div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail.Collect
    }
}
export default connect(select)(ProductPriceAndFuncs);
