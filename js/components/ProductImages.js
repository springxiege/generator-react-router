'use strict';
/**
 * 图片轮播
 */
import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import { Provider, connect } from 'react-redux'
import Swiper from 'swiper';
import '../../css/main-images.css';
import '../plugins/swiper/swiper.min.css';

class ProductImages extends React.Component {

    render() {
        var items = this.props.state;
        var html = React.Children.map(items,function(item, index){
            return (<li className="swiper-slide"><img src={item} width="100%" alt={index} /></li>);
        });
        return (
            <div className="main-images swiper-container" ref="mainImages">
                <ul className="swiper-wrapper">
                    {html}
                </ul>
                <span className="swiper-pagination" ref="mainImagesPage"></span>
            </div>
        )
    }
    componentDidMount() {
        var mainImages = new Swiper(findDOMNode(this.refs.mainImages), {
            pagination: findDOMNode(this.refs.mainImagesPage)
        })
    }
};
function select(state){
    return {state: state.GoodsDetail.goods_images};
}
export default connect(select)(ProductImages);
