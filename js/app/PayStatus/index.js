import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
export default class PaySuccess extends Component{
    constructor(){
        super();
        this.state = {
            seconds:10
        }
    }
    componentDidMount(){
        let _this = this
        if(this.props.params.payStatus == 1){
            document.title = '支付成功'
        }else{
            document.title = '支付失败'
        }
        $.loading.hide();
        this.timer = setInterval(()=>{
            if(this.state.seconds <= 0){
                clearInterval(_this.timer)
                _this.timer = null;
                window.location.hash = '#/UserCenter'
            }else{
                let c = this.state.seconds - 1;
                this.setState({
                    seconds:c
                })
            }
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
        this.timer = null;
    }
    render(){
        let status = this.props.params.payStatus || 0
        return (
            <div className="main">
                <div className="main-pay-logo">
                    <img src="http://s.51lianying.com/images/xds/trade/x1.png" alt="" />
                </div>
                {status == 1 ? (
                    <div className="main-notes">
                        <h1>支付成功</h1>
                    </div>
                ) : (
                    <div className="main-notes fail">
                        <h1>支付失败</h1>
                    </div>
                )}
                <div className="main-pay-note">
                    <span>{this.state.seconds}</span>秒钟后跳转至<a href="#/UserCenter">个人中心</a>
                </div>
                
            </div>
        )
    }
}