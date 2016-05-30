'use strict';
/**
 * 图片轮播
 */
import React from 'react';
export class ProductImages extends React.Component {
    render() {
        var items = this.props.images;
        var html = items.map(function(item, index) {
            return (<li className="swiper-slide"><img src={item} width="100%" alt={index} /></li>);
        });
        return (
            <div className="main-images swiper-container" ref="mainImages">
                <ul className="swiper-wrapper">
                    {html}
                </ul>
                <span className="swiper-pagination"></span>
            </div>
        )
    }
    componentDidMount() {
        var mainImages = new Swiper(this.refs.mainImages.getDOMNode(), {
            pagination: $(this.refs.mainImages.getDOMNode()).find('.swiper-pagination')
        })
    }
};