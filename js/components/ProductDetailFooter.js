'use strict';
// 详情页底部
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {gotoBuy} from '../actions/ActionFuncs'
class ProductDetailFooter extends React.Component {
    gotobuy(){
        let _data      = this.props.state.GoodsDetail
        let _selectObj = _data.GoodsSelectSku
        let _select    = _selectObj.selected
        let _subselect = _selectObj.subselected
        let _count     = _selectObj.count
        let _id        = _data.data.id
        let _title     = _data.data.title
        let _temp      = {}
        if(_select === null || _subselect === null){
            alert('请选择规格')
            return false;
        }
        _temp.id          = _id;
        _temp.count       = _count;
        _temp.title       = _title;
        _temp.selected    = _select;
        _temp.subselected = _subselect;
        window.location.hash = '#/BuyList/'+_id
    }
    render() {
        let _id = this.props.userId || 1
        let _link = '/AllGoods/'+_id 
        return (
            <footer>
                <div className="main-product-footer clearfix">
                    <div className="main-footer-btn main-footer-icon main-usercenter fl"><Link to="/UserCenter">个人中心</Link></div>
                    <div className="main-footer-btn main-footer-icon main-shoppingcart fl"><Link to="/ShoppingCart">购物车</Link></div>
                    <div className="main-footer-btn main-footer-icon main-allgoods fl"><Link to={_link}>全部宝贝</Link></div>
                    <div className="main-footer-btn main-buy-now" onClick={e=>this.gotobuy(e)}><span>立即购买</span></div>
                </div>
            </footer>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state
    }
}
export default connect(select)(ProductDetailFooter);