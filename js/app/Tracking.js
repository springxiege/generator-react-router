import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    getTracking
} from '../actions/ActionFuncs'
class Tracking extends Component{
    componentDidMount(){
        document.title = '退换货'
        this.serverRequest = $.ajax({
            url: config.url + '/orders/abandon/returns/' + this.props.params.orderId,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:(request)=>{
                $.loading.show();
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                // console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data){
                        this.props.dispatch(getTracking(data.data))
                        $.loading.hide();
                    }
                }
            }
        })
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    // 受控input
    setParcelNum(e){
        
    }
    // 确认物流单号
    ConfirmReturn(e){
        let _ParcelNum = $('#ParcelNum').val()
        if(_ParcelNum==''){
            $.error('物流单号不能为空')
        }
        $.ajax({
            url: config.url + '/orders/abandon/returns/' + this.props.params.orderId,
            type: 'POST',
            headers:{
                token:config.head
            },
            dataType: 'json',
            data: {
                _method:'put',
                parcel_num:_ParcelNum
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
            }
        })
    }
    // 跳转到退换货列表
    ConfirmBack(e){
        window.location.hash = '#/ReturnOrder'
    }
    // 渲染模板
    render(){
        let _data = this.props.state.data;
        let _HTML = '信息加载中...'
        if(!$.isEmptyObject(_data)){
            _HTML = (
                <div className="main">
                    <div className="ApplicationStatus">
                        提交成功
                    </div>
                    <div className="ApplicationTrade">
                        <p>退换货收件人姓名：<span>{_data.shop.shop_name}</span></p>
                        <p>退换货收件人电话：<a href={"tel://"+_data.shop.after_market_tel}>{_data.shop.after_market_tel}</a></p>
                    </div>
                    <h2 className="trade-status">{_data.address?"卖家已同意退换货":"请等待卖家同意退换货"}</h2>
                    <div className="ApplicationWating">
                        <h3>退换货收件人地址</h3>
                        <p>{_data.address?(_data.address.name + ' ' + _data.address.tel + ' ' + _data.address.street):"卖家同意退换货后方可显示"}</p>
                    </div>
                    <div className="ApplicationWating">
                        <h3>输入退换物流单号<small>(商家确认后才可填写)</small></h3>
                        <p>
                            {_data.address ? (
                                _data.parcel_num ? (
                                    <input type="text" name="ordernumber" id="ParcelNum" placeholder="" value={_data.parcel_num} readOnly onChange={e=>this.setParcelNum(e)} />
                                ):(
                                    <input type="text" name="ordernumber" placeholder="请填写物流单号" onChange={e=>this.setParcelNum(e)} />
                                )
                                
                            ) : (

                                <input type="text" name="ordernumber" id="ParcelNum" placeholder="待商家确认后方可填写物流单号" readOnly  />
                                
                            )}
                        </p>
                    </div>
                    <div className="Application-notes">
                        <h3>提示：</h3>
                        <p>点击号码直接拨打卖家电话，</p>
                        <p>在"退换货"页面点击"售后跟踪"可进入当面。</p>
                    </div>
                    {_data.address ? (
                        _data.parcel_num ? (
                            <span className="btn-add-address" onClick={e=>this.ConfirmBack(e)}>确认</span>
                        ) : (
                            <span className="btn-add-address" onClick={e=>this.ConfirmReturn(e)}>确认</span>
                        )
                    ) : (
                        <span className="btn-add-address" onClick={e=>this.ConfirmBack(e)}>确认</span>
                    )}
                </div>
            )
        }
        return (
            <div>{_HTML}</div>
        )
    }
}
function select(state){
    return {state:state.Tracking};
}
export default connect(select)(Tracking);