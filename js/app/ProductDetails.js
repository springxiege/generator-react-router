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
                    config.buyid = data.data.id;
                    config.goods_id = _id;
                    config.imgUrl = data.data.goods_images[0]||data.data.goods_images[1]||data.data.goods_images[2];
                    if(tradeStore && tradeStore.userinfo){
                        config.buyid = store.get('trade').userinfo.id
                        LYA({
                            action: ['user_visit', 'common'],
                            debug: false,
                            param: {
                                buy_id: config.buyid,
                                goods_id: _id,
                                come_from: 'xds'
                            }
                        });
                    }
                    window.share_config = {
                        // title : '我要联赢标题',//标题
                        desc : '我要联赢描述',//描述 
                        link : config.link,//链接地址   
                        imgUrl : config.imgUrl,//图片地址
                        shareTrigger: function (res) {
                            console.log('trigger');
                        },
                        shareSuccess: function (res, channel) {
                             console.log(res);
                            switch (channel) {
                                case 'toFriend':
                                    config.state('share_weixin_to_friend');
                                    break; 
                                case 'toTimeline':
                                    config.state('share_weixin_to_timeline');
                                    break; 
                                case 'toQQ':
                                    config.state('share_weixin_to_qq');
                                    break; 
                                case 'toWeibo':
                                    config.state('share_weixin_to_weibo');
                                    break; 
                                default:
                                    break;
                            }
                            // share_stat(_code);
                        },

                        shareCancel: function (res) {
                            console.log('cancel');
                            // share_stat('3');
                        },
                        shareFail: function (res) {
                            console.log('fail');
                            // share_stat('4');
                        }
                    };
                    
                }else{
                    alert('商品应该不存在!');
                    window.close();
                    // alert('请求成功，返回错误,错误code:'+data.code+'，请刷新页面重试！');
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
