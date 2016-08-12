'use strict';
import React,{Component} from 'react';
import {
    Link
} from 'react-router';
import {connect} from 'react-redux'
import {
    getUserInfo,
    ModifyNickName
} from '../actions/ActionFuncs'
import ButtonCenter from '../components/ButtonCenter'
class Settings extends Component{
    componentDidMount() {
        document.title = '设置'
        this.serverRequest = $.ajax({
            url: config.url + '/user/info',
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
                if(parseInt(data.code) === 0){
                    if(data.data.data){
                        this.props.dispatch(getUserInfo(data.data.data))
                        $.loading.hide();
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
                    $.tips('请输入昵称',1000,function(){
                        $(pop).find('[name=nickname]').focus();
                    });
                    return false;
                }
                $.ajax({
                    url: config.url + '/user/info',
                    type: 'put',
                    dataType: 'json',
                    data: {
                        name:_new_nickname
                    },
                    beforeSend:(request)=>{
                        config.setRequestHeader(request);
                    },
                    error:(error)=>{
                        config.ProcessError(error);
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
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].size > 2*1024*1024){
            $.tips('上传图片大于2M，请上传小图片')
            return false;
        }
        reader.onload = function(e){
            // console.log(e.target.result);
            var base64 = e.target.result;
            base64 = base64.substr( base64.indexOf(',') + 1 );

            $.ajax({
                url: 'http://s.51lianying.com/upload/?c=image&m=process_for_form&type=trade&item=avator&base64=1&field=photo',
                type: 'POST',
                dataType: 'json',
                data: {
                    'image_data':base64
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(datas)=>{
                    // console.log(datas)
                    $.ajax({
                        url: config.url + '/user/info',
                        type: 'put',
                        dataType: 'json',
                        data: {
                            headimgurl:datas.data.url
                        },
                        error:(error)=>{
                            config.ProcessError(error);
                        },
                        beforeSend:(request)=>{
                            config.setRequestHeader(request);
                        },
                        success:(idata)=>{
                            // console.log(idata)
                            if(parseInt(idata.code) === 0){
                                $.tips('上传成功');
                                $('#logo').prop('src', datas.data.url)
                            }else{
                                $.tips('上传失败，请重试！')
                            }
                        }
                    })

                }
            })
        }
    }
    render(){
        let _data = this.props.state
        // console.log(_data)
        return (
            <div className="main">
                <div className="settings-header">
                    <div className="settings-img fl">
                        <input type="file" name="photo" accept="image/*" id="" onChange={e=>this.uploadImage(e)} />
                        <img id="logo" src={_data.headimgurl} alt="" />
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
                <ButtonCenter />
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
