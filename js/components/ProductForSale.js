'use strict';
// 产品售后

import React from 'react';
import {connect} from 'react-redux'
class ProductForSale extends React.Component {
    render() {
        return (
            <div className="main-product-sale swiper-slide swiper-no-swiping">
                <div className="main-table">
                    <h4>基本参数</h4>
                    <div className="main-table-body">
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">商品编码</div>
                            <div className="main-table-td fl">{this.props.snum}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">生产地址</div>
                            <div className="main-table-td fl">{this.props.madeby}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">保质时长</div>
                            <div className="main-table-td fl">{this.props.expire}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">售后方式</div>
                            <div className="main-table-td fl">{this.props.maintain}</div>
                        </div>
                        <div className="main-table-tr clearfix">
                            <div className="main-table-td fl">发货地</div>
                            <div className="main-table-td fl">{this.props.deliver_address}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(ProductForSale);
