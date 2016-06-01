'use strict';
// 总路由配置
import '../../css/reset.css';
import '../../css/layout.css';
import '../plugins/hotcss/hotcss.js';
import routes from './routers.config'
import React from "react";
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import { createHistory } from 'history';
import { reduxReactRouter, routerStateReducer, ReduxRouter,pushState } from 'redux-react-router';
import trade from '../reducers/index'
import ProductDetails from '../app/ProductDetails.js';
import UserCenter from '../app/UserCenter.js';
import AllGoods from '../app/AllGoods.js';
import ShoppingCart from '../app/ShoppingCart.js';


// ReactDOM.render(
//     <div>艹，为什么？</div>,
//     document.getElementById('app')
// )
console.log(trade)
let store = createStore(trade);



ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={hashHistory} routes={routes} />
        </Provider>
    </div>,
    document.getElementById('app'));
