'use strict';
// 详情页原价与运费
import React from 'react';
export default class ProductOriginalPriceAndFee extends React.Component {
    render() {
        return (
            <div className="main-oringinal-price clearfix">
                <div className="main-oringinal-module fl">原价:<span>{this.props.originalprice}</span></div>
                <div className="main-fee fr">快递:<span>{this.props.fare}元</span></div>
            </div>
        )
    }
};