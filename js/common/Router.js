'use strict';
// 总路由配置
import '../../css/reset.css';
import '../../css/layout.css';
import '../plugins/hotcss/hotcss.js';
import React from "react";
import ReactDOM from 'react-dom';
import ProductDetails from '../app/ProductDetails.js';
import UserCenter from '../app/UserCenter.js';
import AllGoods from '../app/AllGoods.js';
import ShoppingCart from '../app/ShoppingCart.js';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';

console.log(ProductDetails);
// ReactDOM.render(
//     <div>艹，为什么？</div>,
//     document.getElementById('app')
// )

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={ProductDetails} />
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/UserCenter" component={UserCenter} />
        <Route path="/allgoods" component={AllGoods} />
        <Route path="/ShoppingCart" component={ShoppingCart} />
    </Router>,
    document.getElementById('app'));