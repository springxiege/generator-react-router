import '../../css/main-buy.css'
import '../../css/main-order.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
// import {  } from '../actions/ActionFuncs'
class UnfilledOrder extends Component{
    componentDidMount() {
        document.title = '待发货订单'  
    }
    componentWillUnmount() {
          
    }
    render(){
        return (
            <div className="main-module">
                <div className="part-item">
                    <h3><img src="images/3.jpg" alt="" />&ensp;&ensp;王小二的时尚卖手 <span className="order-status fr">卖家待发货</span></h3>
                    <div className="part-list">
                        <div className="part-info clearfix">
                            <img src="images/7.jpg" alt="" class="fl" />
                            <div className="part-detail">
                                <h4>方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便</h4>
                                <p>黑色，38.5</p>
                                <p>&yen;699.00 <s>&yen;999.00</s> <span class="fr">快递：20元</span></p>
                                <span>&times;2</span>
                            </div>
                        </div>
                    </div>
                    <div className="part-subtotal">
                        小计：<span>1398.00</span>元
                    </div>
                    <div className="part-funcs return-order">
                        <span className="fr">提醒发货</span>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(UnfilledOrder);