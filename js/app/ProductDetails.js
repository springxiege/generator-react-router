'use strict';
// 详情页  page  
import React from 'react';
import ProductImages from '../components/ProductImages.js';
import ProductTitle from '../components/ProductTitle.js';
import ProductDescription from '../components/ProductDescription.js';
import ProductPriceAndFuncs from '../components/ProductPriceAndFuncs.js';
import ProductOriginalPriceAndFee from '../components/ProductOriginalPriceAndFee.js';
import ProductTabs from '../components/ProductTabs.js';
import Recommend from '../components/Recommend.js';
import ProductDetailFooter from '../components/ProductDetailFooter.js';
import ProductDate from '../common/ProductDate.js';
export class ProductDetails extends React.Component {
    render() {
        var _Children = React.Children.map(this.props.children, function(data) {
            console.log(data);
            console.log(React.cloneElement(data, {
                doSomething: '1111'
            }))
        })
        return (
            <div>
                <div className="main">
                    <div className="main-module">
                        <ProductImages images={ProductDate.goods_images} />
                        <ProductTitle title={ProductDate.title} />
                        <ProductDescription description={ProductDate.Description} />
                        <ProductPriceAndFuncs price={price} />
                        <ProductOriginalPriceAndFee originalprice={originalprice} fare={ProductDate.fare} />
                    </div>
                    <ProductTabs  />
                    <Recommend />
                </div>
                <ProductDetailFooter />
            </div>
        )
    }
};