import "../../css/main-buy.css";
import React,{Component} from 'react'
import {
    Link
} from 'react-router'
import {connect} from 'react-redux'
class Buy extends Component{
    render(){
        return (
            <div className="main">
                <div className="part-address">
                    <h2>收货人：汤琪 <span className="fr">13136140570</span></h2>
                    <p>收货地址：浙江省杭州市西湖区万塘路252号计量大厦610</p>
                    <p><a href="#" className="fr">修改收货地址</a></p>
                </div>
                <div className="main-module">
                    <div className="part-item">
                        <h3><img src="images/3.jpg" alt="" />王小二的时尚卖手</h3>
                        <div className="part-list">
                            <div className="part-info clearfix">
                                <img src="images/7.jpg" alt="" className="fl" />
                                <div className="part-detail">
                                    <h4>方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便</h4>
                                    <p>黑色，38.5</p>
                                    <p>&yen;699.00 <s>&yen;999.00</s> <span className="fr">快递：20元</span></p>
                                    <span>&times;2</span>
                                </div>
                            </div>
                            <div className="part-info clearfix">
                                <img src="images/7.jpg" alt="" className="fl" />
                                <div className="part-detail">
                                    <h4>方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便</h4>
                                    <p>黑色，38.5</p>
                                    <p>&yen;699.00 <s>&yen;999.00</s> <span className="fr">快递：20元</span></p>
                                    <span>&times;2</span>
                                </div>
                            </div>
                            <div className="part-info clearfix">
                                <img src="images/7.jpg" alt="" className="fl" />
                                <div className="part-detail">
                                    <h4>方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便</h4>
                                    <p>黑色，38.5</p>
                                    <p>&yen;699.00 <s>&yen;999.00</s> <span className="fr">快递：20元</span></p>
                                    <span>&times;2</span>
                                </div>
                            </div>
                        </div>
                        <div className="part-activities">
                            <span className="fl">商家活动：</span>
                            <div className="clearfix">
                                <p>满500包邮<span className="fr">-20.00元</span></p>
                                <p>满500包邮<span className="fr">-20.00元</span></p>
                            </div>
                        </div>
                        <div className="part-subtotal">小计：<span>1398.00</span>元</div>
                    </div>
                </div>
                <footer className="cart-footer buy-footer clearfix">
                    <aside className="fl">
                        <p className="fr">合计：<span>2097.00元</span></p>
                    </aside>
                    <a href="#">立即支付</a>
                </footer>
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(Buy);