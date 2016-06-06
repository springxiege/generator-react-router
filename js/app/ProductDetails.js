'use strict';
// 详情页  page
import $ from 'jquery'
import React from 'react';
import { Provider, connect } from 'react-redux'
import ProductImages from '../components/ProductImages.js';
import ProductTitle from '../components/ProductTitle.js';
import ProductDescription from '../components/ProductDescription.js';
import ProductPriceAndFuncs from '../components/ProductPriceAndFuncs.js';
import ProductOriginalPriceAndFee from '../components/ProductOriginalPriceAndFee.js';
import ProductSku from '../components/ProductSku.js';
import ProductTabs from '../components/ProductTabs.js';
import Recommend from '../components/Recommend.js';
import ProductSkuSelect from '../components/ProductSkuSelect'
import ProductDetailFooter from '../components/ProductDetailFooter.js';
import ProductDate from '../common/ProductDate.js';
import { GoodsDetail,AddCollect,CancelCollect } from '../actions/ActionFuncs'
class ProductDetails extends React.Component {
    componentDidMount(){

    }
    componentWillMount(){

    }
    render() {
        // var _Children = React.Children.map(this.props.children, function(data) {});
        var price=66666888;
        var originalprice=333;
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
                    <ProductSku />
                    <ProductTabs  />
                    <Recommend />
                </div>
                <ProductDetailFooter />
                <ProductSkuSelect />
            </div>
        )
    }
};
function select(state){
    console.log(state)
    return {state:state};
}
export default connect(select)(ProductDetails);
