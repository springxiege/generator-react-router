import '../../css/main-shopcart.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'

class ShopCartList extends Component {
    _ChangeSingle(){
        console.log(this)
    }
    _ChangeAll(){
        console.log(this)
    }
    render(){

        return (
            <div className="ShopCartList">
                <div className="main">
                    <div className="cart-header">加入购物车，价格无所遁形！</div>
                    <div className="cart-container">
                        <div className="main-module">
                            <div className="cart-info">
                                <div className="cart-info-header clearfix">
                                    <label className="fl"><input type="checkbox" name="product" onChange={e=>this._ChangeSingle(e)} /></label>
                                    <img src="images/3.jpg" alt="" className="fl" />
                                    <p className="fl">王小二时尚卖手</p>
                                    <a href="javascript:;" className="fr">删除</a>
                                </div>
                                <div className="cart-info-item clearfix">
                                    <a href="#" className="fl">
                                        <img src="images/7.jpg" alt="" />
                                    </a>
                                    <div>
                                        <p><a href="#">方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便携</a></p>
                                        <p>黑色，38.5</p>
                                        <p>&yen;699.00 <s>&yen;999.00</s><span>快递：20元</span></p>
                                        <div className="cart-setcount">
                                            <span className="fl"></span>
                                            <input type="number" name="" value="1" id="" className="fl" readOnly />
                                            <span className="fl"></span>
                                            <span className="fr">原小计：699.00元</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-info-footer">
                                    <span className="fl">已加入10天</span>
                                    <p className="up fr">现价小计：&yen;719.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="cart-footer clearfix">
                    <aside className="fl">
                        <label className="fl"><input type="checkbox" name="" id="" onChange={e=>this._ChangeAll(e)} /></label>
                        <span className="fl">全选</span>
                        <p className="fr">合计：<span>2097.00</span></p>
                    </aside>
                    <a href="#">去结算</a>
                </footer>
                <div className="pop-confirm">
                    <div className="pop-container">
                        <div className="pop-main">
                            <i className="pop-btn-close"></i>
                            <h2>删除后无法恢复</h2>
                            <div className="pop-btns clearfix">
                                <span className="pop-btn-cancle fl">取消</span>
                                <span className="pop-btn-ok fr">确认</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.MyCollect
    }
}
export default connect(select)(ShopCartList);
