import '../../css/main-pay.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
class SelectPay extends Component{
    render(){
        return (
            <div className="main">
                <div className="main-pay">
                    <label className="checked"><input type="radio" name="payment" value="1" id="" /></label>
                    <label><input type="radio" name="payment" value="2" id="" /></label>
                </div>
                <div className="main-pay-note">
                    <p>搜索关注 “我要联赢” 微信公众号随时跟踪订单进度</p>
                    <p><img src="images/code.jpg" alt="" /></p>
                </div>
                <p className="main-pay-tel">联系客服：<a href="tel://4006728266">4006728266</a></p>
                <span className="btn-add-address">确认支付</span>
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(SelectPay);