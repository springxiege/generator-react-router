'use strict';
// 总路由配置
import routes from './routers.config'
import React from "react";
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute,
    History
} from 'react-router';
import {
    createStore, 
    combineReducers, 
    applyMiddleware, 
    compose 
} from 'redux'
import { 
    Provider, 
    connect 
} from 'react-redux'
import { 
    createHistory 
} from 'history';
import { 
    reduxReactRouter, 
    routerStateReducer, 
    ReduxRouter,
    pushState 
} from 'redux-react-router';
import trade from '../reducers/index'
let store = createStore(trade);
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'));
