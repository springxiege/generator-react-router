import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
class SelectPay extends Component{
    constructor(){
        super();
        this.state = {
            payment:1
        }
    }
    radioChange(e,id){
        this.setState({
            payment: id
        });
    }
    handleClick(e){
        // let $payment = $(findDOMNode(this.refs.paymethod))
        let _type    = this.state.payment
        let _order   = this.props.params.orderNumber

        _hmt.push(['_trackEvent', 'confirmPay', 'click', '确认支付']);
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
    componentDidMount(){
        document.title = '选择支付方式';
        $.loading.hide();
    }
    render(){
        return (
            <div className="main" ref="paymethod" >
                <div className="main-pay">
                    <label className={this.state.payment == 1 ? "checked" : ""}><input type="radio" name="payment" value="1" id="" onChange={e=>this.radioChange(e,1)} /></label>
                    <label className={this.state.payment == 2 ? "checked" : ""}><input type="radio" name="payment" value="2" id="" onChange={e=>this.radioChange(e,2)} /></label>
                </div>
                <div className="main-pay-note">
                    <p>搜索关注 “我要联赢VIP” 微信公众号随时跟踪订单进度</p>
                    <p><img src="http://s.51lianying.com/images/xds/trade/vip.jpg" alt="" /></p>
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