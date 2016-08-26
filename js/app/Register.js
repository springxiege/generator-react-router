import React,{Component} from 'react'
import {Link} from 'react-router'
import {findDOMNode} from 'react-dom'
export default class Register extends Component{
    constructor(){
        super();
        this.state = {
            disabled:false,
            login:false,
            tel:'',
            code:''
        }
    }
    componentDidMount() {
        document.title = '快速登录'
        $.loading.hide();
    }
    componentWillUnmount() {

    }
    handleChangeCode(e,type){
        let val = e.target.value;
        switch(type){
            case 'tel':
                this.setState({
                    tel:val
                })
                break;
            case 'code':
                this.setState({
                    code:val
                })
                break;
            default:
                break;
        }
    }
    // 获取验证码
    handleGetVerify(e){
        let _this = this;
        let $form = $(findDOMNode(this.refs.quicForm))
        let $btn = $(findDOMNode(e.target))
        let mobile = this.state.tel
        if(mobile==''){
            $.tips('手机号不能为空');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))){
            $.tips('请输入正确的手机号');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if(this.state.disabled){
            return false;
        }else{
            this.setState({
                disabled:true
            })
            let counter = 59;
            $btn.html('60s后重新获取');
            let Timer = setInterval(()=>{
                $btn.html(counter+'s后重新获取');
                if(counter === 0){
                    clearInterval(Timer);
                    Timer = null;
                    _this.setState({
                        disabled:false
                    })
                    $btn.html('重新获取验证码')
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
                        $.confirm({
                            content:data.data.msg,
                            okBtn:function(){}
                        })
                        // $form.find('input[name=verify]').val(data.data.msg);
                    }
                }
            })

        }
    }
    // 登录
    Signin(e){
        let $form = $(findDOMNode(this.refs.quicForm))
        let mobile = this.state.tel
        let verify = this.state.code
        if(mobile==''){
            $.tips('手机号不能为空');
            $form.find('input[name=mobile]').focus();
            return false;
        }
        if(verify == ''){
            $.tips('请输入验证码');
            $form.find('input[name=verify]').focus();
            return false;
        }
        if(!this.state.login){
            this.setState({
                login:true
            })
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
                    this.setState({
                        login:false
                    })
                    // console.log(data)
                    if(parseInt(data.code) === 0){
                        if(window.sessionStorage){
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
                            alert('This browser does not supports sessionStorage')
                        }
                    }else{
                        $.tips(data.data.msg)
                    }
                }
            })
        }
        

    }
    render(){
        return (
            <div className="main">
                <form className="quick-form" ref="quicForm">
                    <label className="clearfix">
                        <input type="number" value={this.state.tel} onChange={e=>this.handleChangeCode(e,'tel')} name="mobile" placeholder="请输入手机号" />
                        {/* 正在获取中则添加disabled类 */}
                        <span className={this.state.disabled ? "disabled" : ""} onClick={e=>this.handleGetVerify(e)}>获取验证码</span>
                    </label>
                    <label>
                        <input type="number" name="verify" value={this.state.code} onChange={e=>this.handleChangeCode(e,'code')} placeholder="请输入短信验证码" />
                    </label>
                    <p className="form-notes">点击登录，即表示您已同意 <Link to={`/Protocol`}>《我要联赢服务协议》</Link></p>
                    <span className={this.state.login?"btn-add-address disabled":"btn-add-address"} onClick={e=>this.Signin(e)}>{this.state.login?"登录中···":"登录"}</span>
                </form>
            </div>
        )
    }
}
