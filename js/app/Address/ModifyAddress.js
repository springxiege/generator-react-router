import React,{Component,find} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import handleAddressForm from '../../event/event.handleAddressForm'
import SubmitAddressForm from '../../event/event.SubmitAddressForm'
class ModifyAddress extends Component {
    constructor(){
        super();
        this.state = {
            checked:true,
            name:'',
            tel:'',
            address:'',
            disabled:false
        };
        this.handleAddressForm = handleAddressForm.bind(this);
        this.SubmitAddressForm = SubmitAddressForm.bind(this);
    }
    componentDidMount(){
        document.title = '添加地址'
        let id = this.props.params.AddressId
        if(id){
            document.title = '编辑地址'
            this.serverRequest = $.ajax({
                url: config.url + '/user/address/' + id,
                type: 'POST',
                dataType: 'json',
                data: {},
                beforeSend:(request)=>{
                    $.loading.show()
                    config.setRequestHeader(request);
                },
                error:(error)=>{
                    config.ProcessError(error);
                },
                success:(data)=>{
                    if(parseInt(data.code)==0){
                        this.setState({
                            checked: data.data.is_default == 1 ? true : false,
                            name: data.data.name,
                            tel: data.data.tel,
                            address: data.data.address,
                            disabled:false
                        })
                        // this.props.dispatch(EditAddress(data.data))
                        $.loading.hide()
                    }
                }
            })
        }
        $.loading.hide();
    }
    componentWillUnmount() {
        this.serverRequest && this.serverRequest.abort();
    }
    render(){
        return (
            <div className="main">
                <h1 className="address-header">请您填写收货地址信息！</h1>
                <h2 className="address-title">填写收货地址</h2>
                <form className="address-form" ref="form" >
                    <label className="clearfix">
                        <span className="fl">姓名</span>
                        <div>
                            <input type="text" name="name" value={this.state.name} onChange={e=>this.handleAddressForm(e,'name')} placeholder="最少两个字" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">电话</span>
                        <div>
                            <input type="text" name="tel" value={this.state.tel} onChange={e=>this.handleAddressForm(e,'tel')} placeholder="手机号码或固定电话" />
                        </div>
                    </label>
                    <label>
                        <span className="fl">地址</span>
                        <div>
                            <textarea value={this.state.address} name="address" onChange={e=>this.handleAddressForm(e,'address')} placeholder="5-60个字，且不能全部为数字"></textarea>
                        </div>
                    </label>
                    <div>
                        <label className={this.state.checked ? " checked" : ""}>
                            <input type="checkbox" name="is_default" id="" onChange={e=>this.handleAddressForm(e,'is_default')} checked={this.state.checked} />
                            设置成默认收货地址
                        </label>
                    </div>
                    <span className="btn-add-address" onClick={e=>this.SubmitAddressForm(e)}>{this.state.disabled?"提交中···":"确认"}</span>
                </form>
            </div>
        )
    }
}
function select(state){
    return {state:state.Address};
}
export default connect(select)(ModifyAddress);