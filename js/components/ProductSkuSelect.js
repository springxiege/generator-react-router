'use strict';
// SKU 属性选择
import React from 'react';
export default class ProductSkuSelect extends React.Component {
    getInitialState() {
            return {
                index: 0,
                subindex: 0,
                count: 1,
                stock: this.props.sku[0].stock,
                hasSubStock: this.props.sku[0].addon.length
            }
        }
        // 规格一选择
    handleClick() {
            var _index = $(e.target).index(),
                _stock = $(e.target).data('stock');
            console.log(this.state.stock)
            this.setState({
                index: _index,
                subindex: 0,
                count: 1,
                stock: _stock,
                hasSubStock: this.props.sku[_index].addon.length
            });
        }
        // 规格二选择
    subhandleClick() {
            var _index = $(e.target).index(),
                _stock = $(e.target).data('stock');
            console.log(this.state.stock)
            this.setState({
                subindex: _index,
                count: 1,
                stock: _stock
            });
        }
        // 添加数量
    addCount() {
            var _count = this.state.count;
            _count = _count + 1;
            this.setState({
                count: _count
            });
        }
        // 减数量
    downCount() {
        var _count = this.state.count;
        _count = _count + 1;
        this.setState({
            count: _count
        });
    }
    render() {
        var _this = this;
        var data = _this.props.sku;
        console.log(data);
        var sku = data.map(function(item, index) {
            var clsName = (_this.state.index == index ? "cur" : "");
            return (
                <li className={clsName} onClick={_this.handleClick} data-stock={item.stock} >{item.feature_main}</li>
            )
        });
        var subsku = data[_this.state.index].addon.length && data[_this.state.index].addon.map(function(item, index) {
            var clsName = (_this.state.subindex == index ? "cur" : "");
            return (
                <li className={clsName} onClick={_this.subhandleClick} data-stock={item.stock} >{item.feature_main}</li>
            )
        });
        var subskuwrap = this.state.hasSubStock > 0 ? (
            <div className="sku-info clearfix">
                <span className="sku-prop-name fl">规格二</span>
                <div className="sku-prop-item">
                    <ul className="clearfix">
                        {subsku}
                    </ul>
                </div>
            </div>
        ) : '';
        return (
            <section className="sku-pop">
                <section className="sku-content">
                    <div className="sku-module">
                        <div className="sku-main">
                            <span className="sku-close" onClick={this.closeSKU}><a href="javascript:;">&times;</a></span>
                            <div className="sku-item">
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">规格一</span>
                                    <div className="sku-prop-item">
                                        <ul className="clearfix">
                                            {sku}
                                        </ul>
                                    </div>
                                </div>
                                {subskuwrap}
                                <div className="sku-info clearfix">
                                    <span className="sku-prop-name fl">数&emsp;量</span>
                                    <div className="sku-prop-item">
                                        <div className="sku-number clearfix">
                                            <span className="number-down fl" onClick={_this.downCount}>-</span>
                                            <input type="number" value={_this.state.count} min="1" max="10" className="number-input fl" />
                                            <span className="number-up fl"  onClick={_this.addCount}>+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-price clearfix">
                                    <div className="main-price-module fl"><span className="yen">&yen;</span>6299.00-8399.00</div>
                                </div>
                                <div className="main-oringinal-price clearfix">
                                    <div className="main-oringinal-module fl">原价:<span>699.00</span></div>
                                    <div className="main-fee fr">快递:<span>20.00元</span></div>
                                </div>
                            </div>
                            <div className="sku-count clearfix">
                                <div className="sku-count-fee fl">
                                    <span>合计：</span>198654.00元
                                </div>
                                <span className="add-to-cart fr">加入购物车</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
};