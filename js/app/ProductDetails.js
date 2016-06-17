'use strict';
// 详情页  page
import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom'
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
        document.title = '商品详情';
        let _id = this.props.params.DetailId||'1';
        this.serverRequest = $.ajax({
            url: 'http://xds.51lianying.local/goods/detail/'+_id,
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                alert('网络错误，页面将刷新重试！');
                window.location.reload();
            },
            success: (data)=>{
                this.props.dispatch(GoodsDetail(data));
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render() {
        // var _Children = React.Children.map(this.props.children, function(data) {});
        var price=66666888;
        var originalprice=333;
        return (
            <div>
                <div className="main">
                    <div className="main-module">
                        <ProductImages />
                        <ProductTitle title={this.props.state.data.title} />
                        <ProductDescription description={this.props.state.data.description} />
                        <ProductPriceAndFuncs price={price} />
                        <ProductOriginalPriceAndFee originalprice={originalprice} fare={this.props.state.data.fare} />
                    </div>
                    <ProductSku />
                    <ProductTabs data={this.props.state.data} />
                    <Recommend />
                </div>
                <ProductDetailFooter />
                <ProductSkuSelect />
            </div>
        )
    }
};
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(ProductDetails);
