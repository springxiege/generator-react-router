'use strict';
// 详情页  page  
import React from 'react';
import ProductImages from '../ProductImages.js';
import ProductTitle from '../ProductTitle.js';
import ProductDescription from '../ProductDescription.js';
import ProductPriceAndFuncs from '../ProductPriceAndFuncs.js';
import ProductOriginalPriceAndFee from '../ProductOriginalPriceAndFee.js';
import ProductTabs from '../ProductTabs.js';
import Recommend from '../Recommend.js';
import ProductDetailFooter from '../ProductDetailFooter.js';
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