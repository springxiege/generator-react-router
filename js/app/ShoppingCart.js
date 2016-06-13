/**
 * 购物车
 */

'use strict';
import React from 'react';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import ShopCartList from '../components/ShopCartList'
export default class ShoppingCart extends React.Component {
    render(){
        return (
            <ShopCartList />
        )
    }
};
