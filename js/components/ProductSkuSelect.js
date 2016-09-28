'use strict';
// SKU 属性选择
import React from 'react';
import {connect} from 'react-redux'
import { 
    GoodsSelectSku , 
    GoodsSelectSkuSub ,
    GoodsSelectedSku,
    ShowAndHideSelectSku, 
    countIncrement , 
    countDecrement 
} from '../actions/ActionFuncs'
import doBuy from '../event/event.gotoBuy'
import addToShopCart from '../event/event.addToShopCart'

class ProductSkuSelect extends React.Component {
    constructor(){
        super();
        this.state = {
            stock:0
        };
        this.doBuy = doBuy.bind(this);
        this.addToShopCart = addToShopCart.bind(this);
    }
    _closeSKU(){
        this.props.dispatch(ShowAndHideSelectSku())
    }
    // 规格一选择
    _handleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        let _data = this.props.state.GoodsDetail.data.goods_addon
        // 判断库存
        if(_data[index].addon.length==1&&_data[index].addon[0].feature_sub==''){
            if(parseInt(_data[index].addon[0].stock) === 0){
                $.tips('库存为0，不可购买');
                return false;
            }
            this.setState({
                stock:_data[index].addon[0].stock
            })

        }else{
            this.setState({
                stock:_data[index].stock
            })
        }
        // 初始化数据
        this.props.dispatch(GoodsSelectSku(index))
        setTimeout(()=>{
            this.props.dispatch(GoodsSelectedSku())
        })
        
    }
    // 规格二选择
    _subhandleClick(e){
        let index = e.target.getAttribute('data-index')
        let clsName = e.target.className
        if(clsName=='cur'){return false;}
        if(this.props.state.GoodsDetail.GoodsSelectSku.selected === null){
            $.tips('请先选择规格一')
            return false;
        };
        let _data = this.props.state.GoodsDetail;
        let mainindex = _data.GoodsSelectSku.selected;
        let _stock = _data.data.goods_addon[mainindex].addon[index].stock;
        if(parseInt(_stock) === 0){
            $.tips('库存为0，不可购买');
            return false;
        }
        this.setState({
            stock:_stock
        })
        this.props.dispatch(GoodsSelectSkuSub(index))
        setTimeout(()=>{
            this.props.dispatch(GoodsSelectedSku())
        })
        
    }
    // 增加购买数量
    _Increment(e){
        let current = this.props.state.GoodsDetail.GoodsSelectSku.count
        let state = this.props.state.GoodsDetail
        let stock = state.data.goods_addon[(state.GoodsSelectSku.selected||0)].addon[0].stock
        if(state.GoodsSelectSku.selected !== null && state.GoodsSelectSku.subselected !== null){
            stock = state.data.goods_addon[state.GoodsSelectSku.selected].addon[state.GoodsSelectSku.subselected].stock
        }
        if($(e.target).closest('div').hasClass('disabled') || $(e.target).hasClass('disabled')){
            return false;
        }
        if(parseInt(current) < parseInt(stock)){
            this.props.dispatch(countIncrement())
        }
    }
    // 减少购买数量
    _Decrement(e){
        let current = this.props.state.GoodsDetail.GoodsSelectSku.count
        if($(e.target).closest('div').hasClass('disabled') || $(e.target).hasClass('disabled')){
            return false;
        }
        if(parseInt(current) > 1){
            this.props.dispatch(countDecrement())
        }
        
    }
    render() {
        let _state          = this.props.state.GoodsDetail
        let _data           = _state.data
        let _GoodsSelectSku = _state.GoodsSelectSku
        let _count          = _GoodsSelectSku.count
        let _selected       = _GoodsSelectSku.selected
        let _subselected    = _GoodsSelectSku.subselected
        let subskudata      = _data.goods_addon?_data.goods_addon[(_selected||0)].addon:[]
        let _fare           = parseFloat(_data.fare).toFixed(1)
        let _clsName        = !_GoodsSelectSku.isvisible?"sku-pop":"sku-pop selecting"
        let sku = (_data.goods_addon).map((item,index)=>{
            let firstaddon = item.addon[0];
            if(item.addon.length === 1 && firstaddon.stock == 0){
                return (
                    <li className="disabled" key={index}>{item.feature_main}</li>
                )
            }
            if(item.addon.length){
                return (
                    <li className={_selected == index ? "cur" : ""} onClick={e=>this._handleClick(e)} data-stock={item.addon[0].stock} data-index={index} key={index}>{item.feature_main}</li>
                )
            }
            
        })
        let subsku = ''
        let subskuwrap = ''
        if(subskudata.length === 1 && subskudata[0].feature_sub === ''){
            
        }else{
            subsku = subskudata.map((item,index)=>{
                return (
                    <li className={_subselected == index ? "cur" : item.stock==0?"disabled":""} onClick={e=>this._subhandleClick(e)} data-stock={item.stock} data-index={index} key={index}>{item.feature_sub}</li>
                )
            })
            subskuwrap = (
                <div className="sku-info clearfix">
                    <span className="sku-prop-name fl">规&nbsp;&nbsp;格</span>
                    <div className="sku-prop-item">
                        <ul className="clearfix">
                            {subsku}
                        </ul>
                    </div>
                </div>
            )
        }
        return (
            <section className={_clsName} ref="skupop">
                <section className="sku-content">
                    <div className="sku-module">
                        <div className="sku-main">
                            <span className="sku-close" onClick={e=>this._closeSKU(e)}><a href="javascript:;" title="关闭"></a></span>
                            <div className="sku-wrapper">
                                <div className="sku-item">
                                    <div className="sku-info clearfix">
                                        <span className="sku-prop-name fl">规&nbsp;&nbsp;格</span>
                                        <div className="sku-prop-item">
                                            <ul className="clearfix">
                                                {sku}
                                            </ul>
                                        </div>
                                    </div>
                                    {subskuwrap}
                                    <div className="sku-info-num clearfix">
                                        <span className="sku-prop-name fl">数&nbsp;&nbsp;量</span>
                                        <div className="sku-prop-item">
                                            <div className={`sku-number clearfix ${this.state.stock == 0 ? "disabled":"" }`}>
                                                <span className={_count == 1 ? "number-down btn-disabled fl" : "number-down fl"} onClick={e=>this._Decrement(e)} title="减"></span>
                                                <input type="number" value={_count} min="1" max="10" ref="input" readOnly className="number-input fl" />
                                                <span className={_count == this.state.stock ? "number-up btn-disabled fl" : "number-up fl"} onClick={e=>this._Increment(e)} title="加"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main-price clearfix">
                                        <div className="main-price-module fl">
                                            合计：
                                            <span className="main-money">{_GoodsSelectSku.amountprice}元</span>
                                            <p><span>(含快递费{_fare}元)</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sku-count clearfix">
                                <div className="add-to-cart fl" onClick={e=>this.addToShopCart(0)}>加入购物车</div>
                                <span className="buy-right-now fr" onClick={e=>this.doBuy(e)}>立即购买</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state
    }
}
export default connect(select)(ProductSkuSelect);
