'use strict';
// 详情页底部
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {
    gotoBuy,
    ShowAndHideSelectSku
} from '../actions/ActionFuncs'
import doBuy from '../event/event.gotoBuy'
class ProductDetailFooter extends React.Component {
    constructor(){
        super();
        this.doBuy = doBuy.bind(this);
    }
    handleToLand(e,url){
        if(!window.config.isWX){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    window.location.hash = '#/Register/' + url
                }else{
                    if(!tradeStore.token){
                        window.location.hash = '#/Register/' + url
                    }else{
                        window.location.hash = '#/' + url
                    }
                }
            }else{
                alert('This browser does not supports localStorage')
            }
        }else{
            window.location.hash = '#/' + url
        }
    }
    render() {
        return (
            <footer>
                <div className="main-product-footer clearfix">
                    <div className="main-footer-btn main-footer-icon main-usercenter fl" onClick={e=>this.handleToLand(e,'UserCenter')}>
                        <a href="javascript:;">个人中心</a>
                        {/*<Link to={`/UserCenter`}>个人中心</Link>*/}
                    </div>
                    <div className="main-footer-btn main-footer-icon main-shoppingcart fl" onClick={e=>this.handleToLand(e,'ShoppingCart')}>
                        <a href="javascript:;">购物车</a>
                        {/*<Link to={`/ShoppingCart`}>购物车</Link>*/}
                    </div>
                    <div className="main-footer-btn main-footer-icon main-allgoods fl"><Link to={`/AllGoods/${this.props.userId || 1}`}>全部宝贝</Link></div>
                    <div className="main-footer-btn main-buy-now" onClick={e=>this.doBuy(e)}><span>立即购买</span></div>
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
