'use strict';
import '../../css/main-usercenter.css'
import React from 'react';
import {
    Link
} from 'react-router';
import {connect} from 'react-redux'
import {getUserCenterInfo} from '../actions/ActionFuncs'
import Recommend from '../components/Recommend'
import BrowseHistory from '../components/BrowseHistory'
import CopyRight from '../components/CopyRight'
class UserCenter extends React.Component {
    componentDidMount() {
        document.title = '个人中心'
        this.serverRequest = $.ajax({
            url: config.url + '/user/info/center',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code)===0){
                    this.props.dispatch(getUserCenterInfo(data.data))
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render(){
        let _data = this.props.state.data
        console.log(_data)
        return (
            <div className="main">
                <div className="usercenter">
                    <div className="user-header clearfix">
                        <div>
                            {_data.userDetail != undefined ? (
                                _data.userDetail.headimgurl == '' ? (
                                    <img src="images/3.jpg" alt="" />
                                ) : (
                                    <img src={_data.userDetail.headimgurl} alt="" />
                                )
                            ) : (
                                <img src={"images/3.jpg"} alt="" />
                            )}
                        </div>
                        <Link to="/Settings">设置</Link>
                        {/*<Link to="/Msg" title="消息"><span className="msg"></span></Link>*/}
                    </div>
                    {_data.userDetail != undefined ? (
                        <h1>{_data.userDetail.name == '' ? '阿琪尔汤' : _data.userDetail.name}
                            {_data.userDetail.country=='' ? '':(
                                _data.userDetail.content == '' ? (
                                    _data.userDetail.city == '' ? (
                                        <span>{_data.userDetail.country}</span>
                                    ) : (
                                        <span>{_data.userDetail.country}·{_data.userDetail.city}</span>
                                    )
                                ): (
                                    _data.userDetail.city == '' ? (
                                        <span>{_data.userDetail.country}·{_data.userDetail.content}</span>
                                    ) : (
                                        <span>{_data.userDetail.country}·{_data.userDetail.content}·{_data.userDetail.city}</span>
                                    )
                                    
                                )
                            )} 
                        </h1>
                         
                    ) : (
                        <h1>阿琪尔汤<span>广东·佛山</span></h1>
                    )}
                </div>
                <div className="main-module">
                    <div className="user-myorder">
                        <span>我的订单</span>
                        {/*<Link to="#">全部订单</Link>*/}
                    </div>
                    <ul className="user-order clearfix">
                        <li>
                            <Link to="/PendingPayOrder">
                                <p>待付款</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.pendingPayment == 0 ? '' : (
                                        <span>{_data.orderNumeric.pendingPayment}</span>
                                    )
                                ) : ''}
                                
                            </Link>
                        </li>
                        <li>
                            <Link to="/UnfilledOrder">
                                <p>未发货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.unfilled == 0 ? '' : (
                                        <span>{_data.orderNumeric.unfilled}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to="/ReceiptOrder">
                                <p>确认收货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.receipt == 0 ? '' : (
                                        <span>{_data.orderNumeric.receipt}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to="/RateOrder">
                                <p>评价</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.commnet == 0 ? '' : (
                                        <span>{_data.orderNumeric.commnet}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to="/ReturnOrder">
                                <p>退换货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.returns == 0 ? '' : (
                                        <span>{_data.orderNumeric.returns}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                    </ul>
                </div>
                {/*
                <div className="main-module">
                    <ul className="main-cash clearfix">
                        <li>消费<p>1560.00元</p></li>
                        <li>收入<p>680.10元</p></li>
                        <li>可提现<p>100.00元</p></li>
                    </ul>
                </div>
                */}
                <div className="main-module">
                    <ul className="main-funcs clearfix">
                        <li><Link to="/MyCollect">收藏</Link></li>
                        <li><Link to="/ShoppingCart">购物车</Link></li>
                    </ul>
                </div>
                {/*
                <div className="main-module">
                    <ul className="main-trade clearfix">
                        <li><Link to="#"><p>51个人</p></Link></li>
                        <li><Link to="#"><p>51商家</p></Link></li>
                        <li><Link to="#"><p>51合伙人</p></Link></li>
                    </ul>
                </div>

                <Recommend />
                */}
                <BrowseHistory />
                <div className="no-longer">
                    <h3><p>没有更多了</p></h3>
                </div>
                <CopyRight />
            </div>
        )
    }
};
function select(state){
    console.log(state)
    return {state:state.UserCenter};
}
export default connect(select)(UserCenter);