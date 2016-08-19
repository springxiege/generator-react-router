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
    GoodsDetail
} from '../actions/ActionFuncs'
import doCollect from '../event/event.doCollect'
class ProductDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            collect:false,
            id:1,
        };
        this.doCollect = doCollect.bind(this);
    }
    componentDidMount(){
        document.title = '商品详情';
        let _this = this;
        let pathname = window.location.pathname.replace(/\//,'').replace(/\.html/,'');
        this.serverRequest = $.ajax({
            url: config.url + '/goods/detail/'+pathname,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                alert('网络错误，请重新打开页面！');
                // window.location.reload();
            },
            success: (data)=>{
                if(parseInt(data.code) == 0){

                    document.title = data.data.title

                    this.props.dispatch(GoodsDetail(data.data));
                    $.loading.hide();
                    // 详情页统计数据
                    let tradeStore = store.get('trade');
                    this.setState({
                        id:data.data.id
                    })
                    if(tradeStore && tradeStore.userinfo){
                        config.buyid = store.get('trade').userinfo.id
                        LYA({
                            action: ['user_visit', 'common'],
                            debug: false,
                            param: {
                                buy_id: config.buyid,
                                goods_id: data.data.id,
                                come_from: 'xds'
                            }
                        });
                        $.refreshToken(function(){
                            // 商品收藏
                            $.ajax({
                                url: config.url + '/goods/collect/whether/' + data.data.id,
                                type: 'POST',
                                dataType: 'json',
                                data: {},
                                beforeSend:(request)=>{
                                    config.setRequestHeader(request);
                                },
                                error:(error)=>{
                                    config.ProcessError(error);
                                },
                                success:(data)=>{
                                    if(parseInt(data.code) === 0){
                                        _this.setState({
                                            collect:data.data[0]
                                        })
                                    }
                                }
                            });
                            // 历史记录
                            $.ajax({
                                url: config.url + '/goods/log/' + data.data.id,
                                type: 'GET',
                                dataType: 'json',
                                data: {},
                                beforeSend:(request)=>{
                                    config.setRequestHeader(request);
                                },
                                error:(error)=>{
                                    config.ProcessError(error);
                                },
                                success:(data)=>{
                                    console.log(data);
                                }
                            })
                        })
                    }
                    
                }else{
                    alert('商品不存在!');
                    window.close();
                    // alert('请求成功，返回错误,错误code:'+data.code+'，请刷新页面重试！');
                    // window.location.reload();
                }

            }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        config.errorImage()     
    }
    componentWillUnmount() {
        this.serverRequest.abort();
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
                        <ProductPriceAndFuncs id={this.state.id} collect={this.state.collect} price={this.props.state.GoodsSelectSku.price} onClick={e=>this.doCollect(e)} />
                        <ProductOriginalPriceAndFee originalprice={this.props.state.GoodsSelectSku.originalprice} fare={this.props.state.data.fare} />
                    </div>
                    <ProductSku />
                    <ProductTabs data={this.props.state.data} />
                    {/*<Recommend />*/}
                </div>
                <ProductDetailFooter userId={this.props.state.userId} detailId={this.state.id}/>
                <ProductSkuSelect detailId={this.state.id} />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(ProductDetails);
