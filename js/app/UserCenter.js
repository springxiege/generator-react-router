'use strict';
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
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code)===0){
                    this.props.dispatch(getUserCenterInfo(data.data));
                    $.loading.hide();
                }else{
                    alert('网络请求错误')
                }
            }
        })

    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render(){
        let _data = this.props.state.data
        return (
            <div className="main pdb0">
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
                        {<Link to="/Messages" title="消息"><span className="msg"></span></Link>}
                    </div>
                    {_data.userDetail != undefined ? (
                        <h1>{_data.userDetail.name || '未获取到信息'}
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
                        <h1>未获取到信息</h1>
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
                                    _data.orderNumeric.prepay_order_cnt == 0 ? '' : (
                                        <span>{_data.orderNumeric.prepay_order_cnt}</span>
                                    )
                                ) : ''}

                            </Link>
                        </li>
                        <li>
                            <Link to="/UnfilledOrder">
                                <p>未发货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.posting_order_cnt == 0 ? '' : (
                                        <span>{_data.orderNumeric.posting_order_cnt}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to="/ReceiptOrder">
                                <p>确认收货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.confirm_order_cnt == 0 ? '' : (
                                        <span>{_data.orderNumeric.confirm_order_cnt}</span>
                                    )
                                ) : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to="/RateOrder">
                                <p>评价</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/ReturnOrder">
                                <p>退换货</p>
                                {_data.orderNumeric ? (
                                    _data.orderNumeric.refund_order_cnt == 0 ? '' : (
                                        <span>{_data.orderNumeric.refund_order_cnt}</span>
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
                <BrowseHistory browsehistory={_data.historyGoods} />
                <div className="no-longer">
                    <h3><p>没有更多了</p></h3>
                </div>
                <CopyRight />
            </div>
        )
    }
};
function select(state){
    return {state:state.UserCenter};
}
export default connect(select)(UserCenter);
