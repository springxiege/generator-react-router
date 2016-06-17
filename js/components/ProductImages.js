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
        let items = this.props.state;
        // 处理数据[过滤掉空数据]
        let arr = []
        for (let i = 0; i < items.length; i++) {
            let v = items[i]
            if(v!=""){
                arr.push(v)
            }
        }
        // 从过滤后的数据中循环出html
        let html = React.Children.map(arr,function(item, index){

            return (
                <li className="swiper-slide" key={index}><img src={item} width="100%" alt={index} /></li>
            );
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
        
    }
    componentDidUpdate(prevProps, prevState) {
        this.mainImages = new Swiper(findDOMNode(this.refs.mainImages), {
            pagination: findDOMNode(this.refs.mainImagesPage)
        })
        this.mainImages.update()
    }
    componentWillUnmount() {
        
    }
};
function select(state){
    return {state: state.GoodsDetail.data.goods_images};
}
export default connect(select)(ProductImages);
