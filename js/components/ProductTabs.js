'use strict';
// 商品详情tab
import React from 'react';
import {findDOMNode} from 'react-dom'
import ProductDetailsChild from './ProductDetailsChild.js';
import ProductForSale from './ProductForSale.js';
import ProductComment from './ProductComment.js';
import Swiper from 'swiper';
import '../../css/main-detailtab.css';
import '../plugins/swiper/swiper.min.css';
export default class ProductTabs extends React.Component {
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    componentDidUpdate(){
        this.productTabs = new Swiper(findDOMNode(this.refs.productTabs), {
            autoHeight: true,
            pagination: findDOMNode(this.refs.productTabsPage),
            paginationClickable: true,
            bulletClass: "tab",
            bulletActiveClass: "cur",
            paginationBulletRender: function(index, clsName) {
                var _name, _comment_count = 1990;
                switch (index) {
                    case 0:
                        _name = "商品详情";
                        break;
                    case 1:
                        _name = "产品售后";
                        break;
                    case 2:
                        _name = "评价" + "<span>(" + _comment_count + ")</span>"
                        break;
                    default:
                        break;
                }
                return '<li class="' + clsName + '">' + _name + '</li>';
            }
        })
        this.productTabs.update();
    }
    render() {

        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab">
                        <ul className="main-tab-page clearfix" ref="productTabsPage">
                            <li className="cur">商品详情</li>
                            <li>产品售后</li>
                            <li>评价<span>(1900)</span></li>
                        </ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            <ProductDetailsChild content={this.props.data.content} />
                            <ProductForSale snum={this.props.data.snum} madeby={this.props.data.made_by} expire={this.props.data.expire} maintain={this.props.data.maintain} deliver_address={this.props.data.deliver_address} />
                            <ProductComment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
