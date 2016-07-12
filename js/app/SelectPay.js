import '../../css/main-pay.css'
import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
class SelectPay extends Component{
    radioChange(e){
        let $self = $(e.target)
        let _type = $self.val()
        $self.closest('label').addClass('checked').siblings('label').removeClass('checked')
    }
    handleClick(e){
        let $payment = $(findDOMNode(this.refs.paymethod))
        let _type    = $payment.find(':radio:checked').val() || 1
        let _order   = this.props.params.orderNumber
        switch(parseInt(_type)){
            case 1:
                window.location.href = '/goods/pay/' + _order
                break;
            case 2:
                window.location.href = '/goods/alipay/' + _order
                break;
            default:
                window.location.href = '/goods/pay/' + _order
                break;

        }
    }
    render(){
        return (
            <div className="main" ref="paymethod" >
                <div className="main-pay">
                    <label className="checked"><input type="radio" name="payment" value="1" id="" onChange={e=>this.radioChange(e)} /></label>
                    <label><input type="radio" name="payment" value="2" id="" onChange={e=>this.radioChange(e)} /></label>
                </div>
                <div className="main-pay-note">
                    <p>搜索关注 “我要联赢” 微信公众号随时跟踪订单进度</p>
                    <p><img src="images/code.jpg" alt="" /></p>
                </div>
                <p className="main-pay-tel">联系客服：<a href="tel://4006728266">4006728266</a></p>
                <span className="btn-add-address" onClick={e=>this.handleClick(e)} >确认支付</span>
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(SelectPay);