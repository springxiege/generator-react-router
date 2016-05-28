'use strict';
// 商品详情

import React from 'react';
export class ProductDetailsChild extends React.Component {
    render() {
        return (
            <div className="main-product-detail swiper-slide" dangerouslySetInnerHTML={{__html:this.props.content}} />
        )
    }
};