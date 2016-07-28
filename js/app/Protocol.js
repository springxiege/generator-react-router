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
                    <p>甲乙双方本着相互信任，真诚合作的原则，经双方友好协商，就乙方为甲方 提供特定服务达成一致意见，特签订本合同(包括本合同附件A)。</p>
                    <p>一、 服务内容</p>
                    <p>    1、乙方同意向甲方提供附于本合同并作为本合同一部分的附件A所列的特定服务。服务的内容、时限、衡量成果的标准见附件A。</p>
                    <p>    2、如果乙方在工作中因自身过错而发生任何错误或遗漏，乙方应无条件更正，而不另外收费，并对因此而对甲方造成的损失承担赔偿责任，赔偿以附件A所载明的该项服务内容对应之服务费为限。若因甲方原因造成工作的延误，将由甲方承担相应的损失。</p>
                    <p>二、 服务费的支付</p>
                    <p>1、服务费总金额为人民币 (大写:     人民币元整)。</p>
                    <p>2、本费用结构仅限於附件A中列明的工作。如果甲方要求扩大项目范围，或因甲方改变已经议定的项目</p>
                </div>
                <span className="btn-add-address fr" onClick={e=>this.goBack(e)}>返回上一页</span>
            </div>
        )
    }
}