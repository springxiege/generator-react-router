'use strict';
// 我要联赢推荐
import React from 'react';
import {Link} from 'react-router'
export default class Recommend extends React.Component {
    constructor(){
        super();
        this.state = {
            data:[],
            reflesh:false,
            start:true
        }
        this.freshList = this.freshList.bind(this);
    }
    componentDidMount(){
        
        this.server = $.ajax({
            url: config.url + '/recommandGoods',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend: (request)=>{
                // config.setRequestHeader(request)
            },
            error: (error)=>{
                config.ProcessError(error)
            },
            success: (data)=>{
                if(parseInt(data.code) === 0){
                    // console.log(data)
                    if(data.data){
                        this.setState({
                            data: data.data || []
                        })
                    }
                }
            }
        })
    }
    componentWillUnmount(){
        this.server.abort()
    }
    freshList() {
        if(!this.state.reflesh){
            this.setState({
                reflesh:true,
                start:false
            });
            $.ajax({
                url: config.url + '/recommandGoods',
                type: 'GET',
                dataType: 'json',
                data: {
                    ref:1
                },
                beforeSend: (request)=>{
                    // config.setRequestHeader(request)
                },
                error: (error)=>{
                    config.ProcessError(error)
                },
                success: (data)=>{
                    if(parseInt(data.code) === 0){
                        // console.log(data)
                        if(data.data){
                            this.setState({
                                data: data.data || []
                            })
                        }
                    }
                },
                complete: ()=>{
                    this.setState({
                        reflesh:false
                    })
                }
            })
        }
        
    }

    render() {
        return (
            <div>
                {this.state.data && this.state.data.length ? (
                    <div className="main-module">
                        <div className="main-recommend">
                            <h4>
                                <p>我要联赢推荐</p>
                                <span className={this.state.reflesh?"cur":""} title="刷新或者换一换" onClick={this.freshList}></span>
                            </h4>
                            <ul className="clearfix">
                                {this.state.data.map((item,index)=>{
                                    return (
                                        <li>
                                            <a href={item.id}>
                                                {!this.state.start?(
                                                    <img src={item.goods_images} alt=""/>
                                                ):(
                                                    <img className="loadimg" src="http://s.51lianying.com/images/xds/trade/logobg_mini.gif" data-url={item.goods_images} alt="" />
                                                )}
                                                
                                                <p className="re-summary">{item.title}</p>
                                                <p className="re-price">&yen;{item.min_price}</p>
                                            </a>
                                        </li>
                                    )
                                })}
                                {/*
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
                                </li>*/}
                            </ul>
                        </div>
                    </div>
                ):''}
            </div>
            
        )
    }
};
