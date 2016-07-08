import '../../css/main-address.css'
import React,{Component,find} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
class AddressAdd extends Component {
    componentDidMount(){
        document.title = '添加地址'
    }
    componentWillUnmount() {
        
    }
    formSubmit(e){
        let $form      = $(findDOMNode(this.refs.form))
        let _name      = $form.find('[name=name]').val()
        let _tel       = $form.find('[name=tel]').val()
        let _address   = $form.find('[name=address]').val()
        let is_default = $form.find('[name=is_default]').is(':checked')?1:0
        if(_name == ''){alert('姓名不能为空');return false;}
        if(_tel == ''){alert('电话号码不能为空');return false};
        if(_address == ''){alert('地址不能为空');return false};
        let param = {
            name:_name,
            tel:_tel,
            address:_address,
            is_default:is_default
        }
        $.ajax({
            url: config.url + '/user/address',
            type: 'POST',
            dataType: 'json',
            data: param,
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    window.location.hash = '#/Address/'+this.props.params.transfertype
                }
            }
        })
    }
    ChangeDefault(e){
        $(e.target).closest('label').toggleClass('checked');
    }
    render(){
        return (
            <div className="main">
                <h1 className="address-header">请您填写收货地址信息！</h1>
                <h2 className="address-title">填写收货地址</h2>
                <form className="address-form" ref="form">
                    <label className="clearfix">
                        <span className="fl">姓名</span>
                        <div>
                            <input type="text" name="name" defaultValue="" placeholder="最少两个字" />
                        </div>
                    </label>
                    <label className="clearfix">
                        <span className="fl">电话</span>
                        <div>
                            <input type="text" name="tel" defaultValue="" placeholder="手机号码或固定电话" />
                        </div>
                    </label>
                    <label>
                        <span className="fl">地址</span>
                        <div>
                            <textarea defaultValue="" name="address" placeholder="5-60个字，且不能全部为数字"></textarea>
                        </div>
                    </label>
                    <div>
                        <label>
                            <input type="checkbox" name="is_default" id="" onChange={e=>this.ChangeDefault(e)} />
                            设置成默认收货地址
                        </label>
                    </div>
                    <span className="btn-add-address" onClick={e=>this.formSubmit(e)}>确认</span>
                </form>
            </div>
        )
    }
}
function select(state){
    return {state:state.Address};
}
export default connect(select)(AddressAdd);