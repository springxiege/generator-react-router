'use strict';
// 商品详情tab
import React from 'react';
import ProductDetailsChild from './ProductDetailsChild.js';
import ProductForSale from './ProductForSale.js';
import ProductComment from './ProductComment.js';
import ProductDate from '../common/ProductDate.js';
import Swiper from 'swiper';
import '../../css/main-detailtab.css';
import '../plugins/swiper/swiper.min.css';
export default class ProductTabs extends React.Component {
    render() {
      
        return (
            <div className="main-module">
                <div className="main-detailtab">
                    <div className="main-tab">
                        <ul className="main-tab-page clearfix">
                            <li className="cur">商品详情</li>
                            <li>产品售后</li>
                            <li>评价<span>(1900)</span></li>
                        </ul>
                    </div>
                    <div className="main-product-content swiper-container" ref="productTabs">
                        <div className="main-product-wrapper swiper-wrapper">
                            <ProductDetailsChild content={ProductDate.content} />
                            <ProductForSale snum={ProductDate.snum} madeby={ProductDate.madeby} expire={ProductDate.expire} maintain={ProductDate.maintain} deliver_address={ProductDate.deliver_address} />
                            <ProductComment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        var productTabs = new Swiper('.main-product-content', {
            autoHeight: true,
            pagination: '.main-tab-page',
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
    }
};