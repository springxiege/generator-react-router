'use strict';
// 详情页  page
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import ProductImages from '../components/ProductImages';
import ProductTitle from '../components/ProductTitle';
import ProductDescription from '../components/ProductDescription';
import ProductPriceAndFuncs from '../components/ProductPriceAndFuncs';
import ProductOriginalPriceAndFee from '../components/ProductOriginalPriceAndFee';
import ProductSku from '../components/ProductSku';
import ProductTabs from '../components/ProductTabs';
// import Recommend from '../components/Recommend';
import ProductSkuSelect from '../components/ProductSkuSelect'
import ProductDetailFooter from '../components/ProductDetailFooter';
import ReturnTop from '../components/ReturnTop'
import {
    GoodsDetail,
    AddCollect,
    CancelCollect
} from '../actions/ActionFuncs'
class ProductDetails extends React.Component {
    componentDidMount(){
        document.title = '商品详情';
        let _id = this.props.params.DetailId||'1';
        this.serverRequest = $.ajax({
            url: config.url + '/goods/detail/'+_id,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                alert('网络错误，请刷新页面重试！');
                // window.location.reload();
            },
            success: (data)=>{
                if(parseInt(data.code) == 0){
                    this.props.dispatch(GoodsDetail(data.data));
                    $.loading.hide();
                }else{
                    alert('请求成功，返回错误,错误code:'+data.code+'，请刷新页面重试！');
                    // window.location.reload();
                }

            }
        })

    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render() {
        // var _Children = React.Children.map(this.props.children, function(data) {});
        return (
            <div>
                <div className="main">
                    <div className="main-module">
                        <ProductImages />
                        <ProductTitle title={this.props.state.data.title} />
                        <ProductDescription description={this.props.state.data.description} />
                        <ProductPriceAndFuncs price={this.props.state.GoodsSelectSku.price} />
                        <ProductOriginalPriceAndFee originalprice={this.props.state.GoodsSelectSku.originalprice} fare={this.props.state.data.fare} />
                    </div>
                    <ProductSku />
                    <ProductTabs data={this.props.state.data} />
                    {/*<Recommend />*/}
                </div>
                <ProductDetailFooter userId={this.props.state.userId} detailId={this.props.params.DetailId}/>
                <ProductSkuSelect detailId={this.props.params.DetailId} />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(ProductDetails);
