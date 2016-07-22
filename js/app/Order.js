import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
// import {  } from '../actions/ActionFuncs'
class Order extends Component{
    render(){
        return (
            <div className="main pdt100 pdb0">
                <div className="order-tab">
                    <ul className="clearfix">
                        <li><Link activeClassName="cur" to="/PendingPayOrder">待付款</Link></li>
                        <li><Link activeClassName="cur" to="/UnfilledOrder">未发货</Link></li>
                        <li><Link activeClassName="cur" to="/ReceiptOrder">确认收货</Link></li>
                        <li><Link activeClassName="cur" to="/RateOrder">评价</Link></li>
                        <li><Link activeClassName="cur" to="/ReturnOrder">退换货</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}
function select(state){
    return {state:state};
}
export default connect(select)(Order);