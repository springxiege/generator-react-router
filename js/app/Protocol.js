import React,{Component} from 'react'
import {Link} from 'react-router'
export default class Protocol extends Component{
    componentDidMount() {
        document.title = '我要联赢服务协议'  
        $.loading.hide();   
    }
    componentWillUnmount() {
          
    }
    goBack(e){
        window.history.back();
    }
    render(){
        return (
            <div className="main">
                <h1 className="protocol-title">《我要联赢服务协议》</h1>
                <div className="protocal-content">
                    <p>“我要联赢”作为技术支持平台，以保障用户资金安全及超越业内购物体验为己任。</p>
                    <p>“我要联赢”鄙视一切恶意的商业行为及不负责任的商业目的。</p>
                    <p>“我要联赢”尊重每一位爱国公民，并且欢迎国际友人的到来。</p>
                    <p>“我要联赢”不会泄露任何注册用户数据。</p>
                    <p>“我要联赢”希望用简洁的文字向到此的每位天使用户证明，一切将会如您所愿！</p>
                </div>
                <span className="btn-add-address fr" onClick={e=>this.goBack(e)}>返回上一页</span>
            </div>
        )
    }
}