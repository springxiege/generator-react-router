'use strict';
// 我要联赢推荐
import '../../css/main-recommend.css'
import React from 'react';
export default class Recommend extends React.Component {
    freshList() {
        alert(111)
    }
    render() {
        return (
            <div className="main-module">
                <div className="main-recommend">
                    <h4>
                        <p>我要联赢推荐</p>
                        <span title="刷新或者换一换" onClick={this.freshList}></span>
                    </h4>
                    <ul className="clearfix">
                        <li>
                            <a href="#">
                                <img src="/images/4.jpg" alt="" />
                                <p className="re-summary">CHANNEL 粉色手套拳击熊潮...</p>
                                <p className="re-price">&yen;1200</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="/images/5.jpg" alt="" />
                                <p className="re-summary">平板电脑64G平板电脑日晖...</p>
                                <p className="re-price">&yen;1200</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="/images/6.jpg" alt="" />
                                <p className="re-summary">华为手环 B2 TPU 腕带 运动版...</p>
                                <p className="re-price">&yen;1200</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};
