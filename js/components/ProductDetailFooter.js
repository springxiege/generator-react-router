'use strict';
// 详情页底部
import React from 'react';
export class ProductDetailFooter extends React.Component {
    render() {
        return (
            <footer>
                <div className="main-product-footer clearfix">
                    <div className="main-footer-btn main-footer-icon main-usercenter fl"><Link to="/UserCenter">个人中心</Link></div>
                    <div className="main-footer-btn main-footer-icon main-shoppingcart fl"><Link to="/ShoppingCart">购物车</Link></div>
                    <div className="main-footer-btn main-footer-icon main-allgoods fl"><Link to="/AllGoods">全部宝贝</Link></div>
                    <div className="main-footer-btn main-buy-now"><span>立即购买</span></div>
                </div>
            </footer>
        )
    }
};