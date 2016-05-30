/**
 * 全部宝贝
 */
import React from 'react';
export class AllGoods extends React.Component {
    render(){
        return (
            <div>
                <h2>AllGoods Page ....</h2>
                <p><Link to="/ProductDetails">商品详情页</Link></p>
                <p><Link to="/UserCenter">个人中心</Link></p>
            </div>
        )
    }
};