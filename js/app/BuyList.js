import "../../css/main-buylist.css";
import React,{Component} from 'react'
import {
    Link
} from 'react-router'
import {connect} from 'react-redux'
class BuyList extends Component{
    componentDidMount() {
        console.log(this)
        this.serverRequest = $.ajax({
            url: config.url + '/goods/addon/' + (this.props.params.buyId||'1'),
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) == 0){
                    
                }
            }
        })
         
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render(){
        return (
            <div className="main">
                <div className="buy">
                    <div className="buy-item">
                        <Link to="#">
                            <img src="images/7.jpg" alt="" className="fl" />
                            <div className="buy-info">
                                <h2>方糖音箱 无线WiFi音响 迷你智能小音箱 原木体感触控桌面 便携</h2>
                                <p className="buy-summary">黑色  38.5 <span className="fr">&times;1</span></p>
                                <p className="buy-price">&yen;699.00 <s>&yen;999.00</s><span className="fr">快递：20元</span></p>
                            </div>
                        </Link>
                        <div className="buy-sku">
                            <div className="buy-sku-item clearfix">
                                <span className="fl">规格一</span>
                                <ul>
                                    <li className="cur">红色</li>
                                    <li>黄色</li>
                                    <li>黑色</li>
                                    <li>紫红色</li>
                                    <li>绿色</li>
                                    <li>紫黑色</li>
                                </ul>
                            </div>
                            <div className="buy-sku-item clearfix">
                                <span className="fl">规格一</span>
                                <ul>
                                    <li className="cur">红色</li>
                                    <li>黄色</li>
                                    <li>黑色</li>
                                    <li>紫红色</li>
                                    <li>绿色</li>
                                    <li>紫黑色</li>
                                </ul>
                            </div>
                            <div className="buy-sku-item clearfix">
                                <span className="fl">数&emsp;量</span>
                                <div className="buy-number clearfix">
                                    <span className="btn-add-count fl"></span>
                                    <input type="number" name="" value="1" readonly id="" className="fl" onChange={e=>this.Change(e)} />
                                    <span className="btn-minus-count fl"></span>
                                    <i>件(库存1005件)</i>
                                    <span className="btn-del-buy fr">删除</span>
                                    <span className="btn-add-buy fr">添加</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="cart-footer buy-footer clearfix">
                    <aside className="fl">
                        <p className="fr">合计：<span>2097.00元</span></p>
                    </aside>
                    <Link to="#">确认</Link>
                </footer>
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(BuyList);