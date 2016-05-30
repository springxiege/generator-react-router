'use strict';
import React from 'react';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
export default class UserCenter extends React.Component {
    render(){
        return (
            <div>
            <h2>UserCenter Page ....</h2>
            <p><Link to="/ProductDetails">商品详情页</Link></p>
            <p><Link to="/allgoods">全部宝贝</Link></p>
        </div>
        )
    }
};