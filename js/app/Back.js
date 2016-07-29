import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
export default class RateOrder extends Component{
    componentDidMount() {
        document.title = '退货原因'
    }
    componentWillUnmount() {
          
    }
    FormConfirm(e){
        let $form = $(findDOMNode(this.refs.reason))
        let abandon_reason = $form.find('[name=abandon_reason]').val()
        let content = $form.find('[name=content]').val()
        let orderid = this.props.params.orderId
        $.ajax({
            url: config.url + '/orders/abandon',
            type: 'POST',
            dataType: 'json',
            data: {
                _method:'put',
                ids:[orderid],
                type:1,
                abandon_reason:abandon_reason,
                content:content
            },
            beforeSend:(request)=>{
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    $.loading.hide();
                    window.location.hash = '#/ReturnOrder'
                }else{
                    $.error(data.data.msg,1000)
                }
            }
        })
        
    }
    render(){
        return (
            <div className="main">
                <form className="return-money" ref="reason">
                    <h2 className="address-title">退货退款原因</h2>
                    <select name="abandon_reason" id="">
                        <option value="七天无理由退货">七天无理由退货</option>
                        <option value="不想要了">不想要了</option>
                        <option value="卖家未按时间发货">卖家未按时间发货</option>
                        <option value="冲动了">冲动了</option>
                    </select>
                    <textarea name="content" id="" placeholder="给卖家留言"></textarea>
                    <p>还可以输入<span>50</span>个字符</p>
                </form>
                <span className="btn-add-address" onClick={e=>this.FormConfirm(e)}>确认</span>
            </div>
        )
    }
}