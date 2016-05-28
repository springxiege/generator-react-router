'use strict';
// 总路由配置
import React from "react";
import ReactDOM from 'react-dom';
import ProductDetails from '../ProductDetails.js';
import UserCenter from '../UserCenter.js';
import AllGoods from '../AllGoods.js';
import ShoppingCart from '../ShoppingCart.js';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={ProductDetails} />
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/UserCenter" component={UserCenter} />
        <Route path="/allgoods" component={AllGoods} />
        <Route path="/ShoppingCart" component={ShoppingCart} />
    </Router>,
    document.getElementById('app'));