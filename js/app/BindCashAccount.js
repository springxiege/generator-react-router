import React,{Component} from 'react';
export default class BindCashAccount extends Component{
    render(){
        return (
            <div className="main">
                <h2 className="address-title">填写银行卡信息</h2>
                <form className="address-form card-form">
                    <label className="clearfix">
                        <span className="fl">开户姓名</span>
                        <div>
                            <input type="text" value="" placeholder="您的开户姓名" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">手机号码</span>
                        <div>
                            <input type="text" value="" placeholder="11位数手机号码" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">身&ensp;份&ensp;证</span>
                        <div>
                            <input type="text" value="" placeholder="填写您的身份证号码" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">银行卡号</span>
                        <div>
                            <input type="text" value="" placeholder="填写您的银行卡号" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">开&ensp;户&ensp;行</span>
                        <div>
                            <input type="text" value="" placeholder="填写您的银行卡开户行" />
                        </div>
                    </label>
                    <p className="form-notes">提示：请确定银行卡的信息填写正确，一经填入确认后将无法自助修改。如需更换银行卡，需递交全面资料， 在3个工作日内由客服联系修改。</p>
                    <span className="btn-add-address">提交</span>
                </form>
            </div>
        )
    }
}