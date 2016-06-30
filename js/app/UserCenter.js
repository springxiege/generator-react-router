'use strict';
import '../../css/main-usercenter.css'
import React from 'react';
import {
    Link
} from 'react-router';
import Recommend from '../components/Recommend'
import BrowseHistory from '../components/BrowseHistory'
import CopyRight from '../components/CopyRight'
export default class UserCenter extends React.Component {
    render(){
        return (
            <div className="main">
                <div className="usercenter">
                    <div className="user-header clearfix">
                        <div><img src="images/3.jpg" alt="" /></div>
                        <Link to="/Settings">设置</Link>
                        <Link to="/Msg" title="消息"><span className="msg"></span></Link>
                    </div>
                    <h1>阿琪尔汤<span>广东·佛山</span></h1>
                </div>
                <div className="main-module">
                    <div className="user-myorder">
                        <span>我的订单</span>
                        <Link to="#">全部订单</Link>
                    </div>
                    <ul className="user-order clearfix">
                        <li><Link to="#"><p>待付款</p><span>1</span></Link></li>
                        <li><Link to="#"><p>未发货</p><span>2</span></Link></li>
                        <li><Link to="#"><p>确认收货</p><span>3</span></Link></li>
                        <li><Link to="#"><p>评价</p><span>4</span></Link></li>
                        <li><Link to="#"><p>退换货</p><span>5</span></Link></li>
                    </ul>
                </div>
                <div className="main-module">
                    <ul className="main-cash clearfix">
                        <li>消费<p>1560.00元</p></li>
                        <li>收入<p>680.10元</p></li>
                        <li>可提现<p>100.00元</p></li>
                    </ul>
                </div>
                <div className="main-module">
                    <ul className="main-funcs clearfix">
                        <li><Link to="/MyCollect">收藏</Link></li>
                        <li><Link to="/ShoppingCart">购物车</Link></li>
                    </ul>
                </div>
                <div className="main-module">
                    <ul className="main-trade clearfix">
                        <li><Link to="#"><p>51个人</p></Link></li>
                        <li><Link to="#"><p>51商家</p></Link></li>
                        <li><Link to="#"><p>51合伙人</p></Link></li>
                    </ul>
                </div>
                <Recommend />
                <BrowseHistory />
                <div className="no-longer">
                    <h3><p>没有更多了</p></h3>
                </div>
                <CopyRight />
            </div>
        )
    }
};