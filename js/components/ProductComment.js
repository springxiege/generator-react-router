'use strict';
// 详情页评论
import React from 'react';
export default class ProductComment extends React.Component {
    render() {
        return (
            <div className="main-product-comment swiper-slide">
                <div className="coment-tab">
                    <ul>
                        <li className="cur">好评<span>(12306)</span></li>
                        <li>差评<span>(11)</span></li>
                    </ul>
                </div>
                <div className="coment-container">
                    <div className="coment-list">
                        <div className="coment-header clearfix">
                            <img src="images/3.jpg" alt="用户头像" className="fl" />
                            <span className="coment-user fl">凨亦凌</span>
                            <span className="coment-time fr">2016-05-24 19:00:00</span>
                        </div>
                        <div className="coment-star">
                            <span className="coment-stars stars1"></span>
                        </div>
                        <div className="coment-info">宝贝很不错，这个价格挺直的，喜欢的亲们不要犹豫呀！</div>
                        <div className="coment-replay-wrapper">
                            <div className="coment-simple">购买时间:2016年05月24号 19:14</div>
                            <div className="coment-simple">颜色分类:黑色</div>
                        </div>
                        <div className="coment-trade-replay">
                            <div className="coment-trade-replay-info">商家：感谢您的惠顾与支持，有不懂的都可以咨询我们的售后技术员们，祝您生活愉快！</div>
                            <p>反馈时间:2016年5月24号 19:20</p>
                        </div>
                        <div className="coment-info-add">
                            <div className="coment-info">[追加]宝贝很不错，这个价格挺直的，喜欢的亲们不要犹豫呀！</div>
                            <div className="coment-replay-wrapper">
                                <div className="coment-simple">购买时间:2016年05月24号 19:14</div>
                                <div className="coment-simple">颜色分类:黑色</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};