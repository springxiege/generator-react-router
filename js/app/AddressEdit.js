import '../../css/main-address.css'
import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {
    EditAddress,
    AddressEditDefault
} from '../actions/ActionFuncs'
class AddressEdit extends Component {

    componentDidMount(){
        document.title="编辑地址"
        let id = this.props.params.AddressId
        this.serverRequest = $.ajax({
            url: config.url + '/user/address/' + id,
            type: 'POST',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    this.props.dispatch(EditAddress(data.data))
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    // 编辑完成->确定
    OK(e){
        let id         = this.props.params.AddressId
        let $form      = $(findDOMNode(this.refs.form))
        let _name      = $form.find('[name=name]').val()
        let _tel       = $form.find('[name=tel]').val()
        let _address   = $form.find('[name=address]').val()
        let is_default = $form.find('[name=is_default]').is(':checked')?1:0
        if(_name    == ''){alert('姓名不能为空');return false;}
        if(_tel     == ''){alert('电话号码不能为空');return false};
        if(_address == ''){alert('地址不能为空');return false};
        $.ajax({
            url: config.url + '/user/address/'+id,
            type: 'POST',
            dataType: 'json',
            data: {
                _method:'PUT',
                name:_name,
                tel:_tel,
                address:_address,
                is_default:is_default
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code)==0){
                    window.location.hash = '#/Address'
                }
            }
        })
        
    }
    SetDefault(e){
        this.props.dispatch(AddressEditDefault())
    }
    Change(e){

    }
    render(){
        let _data = this.props.state
        let _HTML = '编辑页面可能出错，请刷新重新'
        if(_data.id == this.props.params.AddressId){
            _HTML = (
                <form className="address-form" ref="form">
                    <label className="clearfix">
                        <span className="fl">姓名</span>
                        <div>
                            <input type="text" name="name" defaultValue={_data.name} placeholder="最少两个字" onChange={e=>this.Change(e)} />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">电话</span>
                        <div>
                            <input type="text" name="tel" defaultValue={_data.tel} placeholder="手机号码或固定电话" onChange={e=>this.Change(e)} />
                        </div>
                    </label>
                    <label>
                        <span className="fl">地址</span>
                        <div>
                            <textarea name="address" defaultValue={_data.address} placeholder="5-60个字，且不能全部为数字" onChange={e=>this.Change(e)}></textarea>
                        </div>
                    </label>
                    <div>
                        <label className={this.props.state.is_default==1?"checked":""}>
                            <input type="checkbox" name="is_default" checked={_data.is_default==1?true:false} id={_data.id} onChange={e=>this.SetDefault(e)} />
                            设置成默认收货地址
                        </label>
                    </div>
                    <span className="btn-add-address" onClick={e=>this.OK(e)}>确认</span>
                </form>
            )
        }
        return (
            <div className="main">
                <h1 className="address-header">如需修改，请填写相关信息，或直接确定！</h1>
                <h2 className="address-title">修改收货地址</h2>
                {_HTML}
            </div>
        )
    }
}
function select(state){
    return {state:state.AddressEdit};
}
export default connect(select)(AddressEdit);