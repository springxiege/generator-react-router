'use strict';
// 商品标题
import React from 'react';
export default class ProductTitle extends React.Component {
    render(){
        return (
            <div className="main-title">
                <h3>{this.props.title}</h3>
            </div>
        )
    }
};
