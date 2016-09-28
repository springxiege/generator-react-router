'use strict';
import React,{Component} from 'react';
import {
    Link
} from 'react-router';
import {findDOMNode} from 'react-dom'
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
        let f = e.target.files[0];
        let FR = new FileReader();
        function compressImg(imgData,maxHeight,onCompress){
            if(!imgData)return;
            onCompress = onCompress || function(){};

            maxHeight = maxHeight || 200;//默认最大高度200px

            var canvas = document.createElement('canvas');

            var img = new Image();
            img.onload = function(){ 
                if(img.height > maxHeight) {//按最大高度等比缩放
                    img.width *= maxHeight / img.height; 
                    img.height = maxHeight; 
                }
                var ctx = canvas.getContext("2d"); 
                ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏   
                        //重置canvans宽高
                canvas.width = img.width;
                canvas.height = img.height; 
                ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 

                onCompress(canvas.toDataURL("image/jpeg",0.6));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
            };
            // 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
            img.src = imgData;
        }
        FR.onload = function(f){
            compressImg(this.result,150,function(data){//压缩完成后执行的callback
                // $('imgData').value = data;//写到form元素待提交服务器
                // $('myImg').src = data;//压缩结果验证
                var base64 = data.substr( data.indexOf(',') + 1 );
                $.ajax({
                    url: 'http://s.51lianying.com/upload/?c=image&m=process_for_form&type=trade&item=avator&base64=1&field=photo',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'image_data':base64
                    },
                    beforeSend:()=>{
                        $.loadingtips('show','上传中···')
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
                                    $.loadingtips('hide');
                                    $.tips('上传成功');
                                    $('#logo').prop('src', datas.data.url)
                                }else{
                                    $.tips('上传失败，请重试！')
                                }
                            }
                        })

                    }
                })
            });
        };
        FR.readAsDataURL(f);
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
