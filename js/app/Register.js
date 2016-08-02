import React,{Component} from 'react'
import {Link} from 'react-router'
import {findDOMNode} from 'react-dom'
export default class Register extends Component{
    componentDidMount() {
        document.title = '快速登录'
        $.loading.hide();
    }
    componentWillUnmount() {

    }
    // 获取验证码
    handleGetVerify(e){
        let $form = $(findDOMNode(this.refs.quicForm))
        let $btn = $(findDOMNode(e.target))
        let mobile = $form.find('input[name=mobile]').val()
        if(mobile==''){
            $.error('手机号不能为空');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))){
            $.error('请输入正确的手机号');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if($btn.hasClass('disabled')){
            return false;
        }else{
            $btn.addClass('disabled')
            let counter = 59;
            $btn.html('60s后重新获取');
            let Timer = setInterval(()=>{
                $btn.html(counter+'s后重新获取');
                if(counter === 0){
                    clearInterval(Timer);
                    Timer = null;
                    $btn.removeClass('disabled').html('重新获取验证码')
                }
                counter--;
            },1000)
            $.ajax({
                url: config.hosts + '/regist/send/'+mobile,
                type: 'GET',
                dataType: 'json',
                data: {},
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    // console.log(data)
                    if(parseInt(data.code) === 0){
                        $form.find('input[name=verify]').val(data.data.msg);
                    }
                }
            })

        }
    }
    // 登录
    Signin(e){
        let $form = $(findDOMNode(this.refs.quicForm))
        let $btn = $(findDOMNode(e.target))
        let mobile = $form.find('input[name=mobile]').val()
        let verify = $form.find('input[name=verify]').val()
        if(mobile==''){
            $.error('手机号不能为空');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if(verify == ''){
            $.error('请输入验证码');
            $form.find('input[name=verify]').focus();
            return false;
        }
        $.ajax({
            url: config.hosts + '/register',
            type: 'POST',
            dataType: 'json',
            data: {
                tel:mobile,
                code:verify
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                // console.log(data)
                if(parseInt(data.code) === 0){
                    if(store.enabled){
                        $.setTokenForPC(data.data.token,data.data.data);
                        window.config.head = data.data.token;
                        let _params = this.props.params;
                        let _url = ''
                        // 获取跳转页面的相关参数params集合
                        // 将params里面参数全部提取出来并过滤值为undefined的参数
                        // 组织正确的跳转路由进行跳转
                        // 勿删，删除则会导致无法路由正确跳转
                        for (let i in _params) {
                            let val = _params[i]
                            if(val != undefined && val != 'undefined'){
                                _url += ( '/' + val )
                            }
                        }
                        window.location.hash = '#' + _url ;
                    }else{
                        alert('This browser does not supports localStorage')
                    }
                }else{
                    $.error(data.data.msg)
                }
            }
        })

    }
    render(){
        return (
            <div className="main">
                <form className="quick-form" ref="quicForm">
                    <label className="clearfix">
                        <input type="text" defaultValue="" name="mobile" placeholder="请输入手机号" />
                        {/* 正在获取中则添加disabled类 */}
                        <span onClick={e=>this.handleGetVerify(e)}>获取验证码</span>
                    </label>
                    <label>
                        <input type="text" name="verify" id="" placeholder="请输入短信验证码" />
                    </label>
                    <p className="form-notes">点击登录，即表示您已同意 <Link to={`/Protocal`}>《我要联赢服务协议》</Link></p>
                    <span className="btn-add-address" onClick={e=>this.Signin(e)}>登录</span>
                </form>
            </div>
        )
    }
}
