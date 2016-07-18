'use strict';
import '../../css/main-settings.css'
import React,{Component} from 'react';
import {
    Link
} from 'react-router';
export default class Settings extends Component{
    componentDidMount() {
        document.title = '设置'     
    }
    render(){
        return (
            <div className="main">
                <div className="settings-header">
                    <div className="settings-img fl">
                        <input type="file" name="photo" id="" />
                        <img src="images/3.jpg" alt="" />
                    </div>
                    <div className="settings-name">
                        <h2>阿琪尔汤<a href="javascript:;">修改</a></h2>
                        <p>广东·佛山</p>
                    </div>
                </div>
                <div className="main-module">
                    <ul className="settings">
                        {/*<li><Link to="#">绑定51账号 <span>13136140570</span></Link></li>
                        <li><Link to="#">绑定提现账号</Link></li>
                        <li><Link to="/ReturnAddress">退换货地址</Link></li>*/}
                        <li><Link to="/Address/setting">收货地址</Link></li>
                    </ul>
                </div>
                <div className="pop-confirm">
                    <div className="pop-container">
                        <div className="pop-main">
                            <div className="pop-title">
                                <input type="text" name="nickname" placeholder="昵称修改" id="" />
                            </div>
                            <div className="pop-btns clearfix">
                                <span className="pop-btn-cancle fl">取消</span>
                                <span className="pop-btn-ok fr">确认</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}