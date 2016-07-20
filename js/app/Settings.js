'use strict';
import '../../css/main-settings.css'
import React,{Component} from 'react';
import {
    Link
} from 'react-router';
import {connect} from 'react-redux'
import {
    getUserInfo,
    ModifyNickName
} from '../actions/ActionFuncs'
class Settings extends Component{
    componentDidMount() {
        document.title = '设置'     
        this.serverRequest = $.ajax({
            url: config.url + '/user/info',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getUserInfo(data.data.data))
                    }
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    // 修改昵称
    handleChageName(e){
        let _this = this
        $.confirm({
            content:'<input type="text" name="nickname" placeholder="昵称修改(少于10个字符)" />',
            remove:0,
            init:function(pop){
                $(pop).on('keyup change', 'input[name=nickname]', function(event) {
                    let value = $(this).val()
                    if(value.length>10){
                        $(this).val(value.substring(0,10))
                    }
                });
            },
            okBtn:function(pop){
                let _new_nickname = $(pop).find('input[name=nickname]').val()
                if(_new_nickname == ''||_new_nickname===undefined){
                    $.error('请输入昵称',1000,function(){
                        $(pop).find('[name=nickname]').focus();
                    });
                    return false;
                }
                $.ajax({
                    url: config.url + '/user/info',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        _method:'put',
                        name:_new_nickname
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        if(parseInt(data.code) === 0){
                            _this.props.dispatch(ModifyNickName(_new_nickname))
                            $(pop).remove();
                        }
                    }
                })
                
            }
        })
    }
    // 上传图片
    uploadImage(e){
        var imgCanvas=document.createElement('canvas'),
            imgContext=imgCanvas.getContext('2d'),
            imgAsDataURL=imgCanvas.toDataURL(e.target.value);
        console.log(imgAsDataURL)
        $.ajax({
            url: 'http://s.51lianying.com/upload/?c=image&m=process_for_form&type=trade&item=product&field=photo&nodomain=1',
            type: 'POST',
            dataType: 'json',
            data: {
                url:imgAsDataURL
            },
            contentType: false,
            cache: false,
            processData:false,
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
            }
        })
        
    }
    render(){
        let _data = this.props.state
        console.log(_data)
        return (
            <div className="main">
                <div className="settings-header">
                    <div className="settings-img fl">
                        <input type="file" name="photo" accept="image/*" id="" onChange={e=>this.uploadImage(e)} />
                        <img src={_data.headimgurl} alt="" />
                    </div>
                    <div className="settings-name">
                        <h2>
                            <span id="nickname">{_data.name}</span>
                            <a href="javascript:;" onClick={e=>this.handleChageName(e)}>修改</a>
                        </h2>
                        {_data.country=='' ? "": (
                            _data.content == '' ? (
                                <p>{_data.country}</p>
                            ) : (
                                _data.city == '' ? (
                                    <p>{_data.country} · {_data.content}</p>
                                ) : (
                                    <p>{_data.country} · {_data.content} · {_data.city}</p>
                                )
                            )
                        )}
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
                {/*<div className="pop-confirm">
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
                </div>*/}
            </div>
        )
    }
}
function select(state){
    return {state:state.Settings};
}
export default connect(select)(Settings);