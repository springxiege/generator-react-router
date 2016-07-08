import '../../css/main-address.css'
import React,{Component,find} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
class ReturnAddressAdd extends Component {
    componentDidMount(){
        document.title = '添加退换货地址'
    }
    componentWillUnmount() {
        
    }
    formSubmit(e){
        let $form      = $(findDOMNode(this.refs.form))
        let _name      = $form.find('[name=name]').val()
        let _tel       = $form.find('[name=tel]').val()
        let _address   = $form.find('[name=address]').val()
        if(_name == ''){alert('姓名不能为空');return false;}
        if(_tel == ''){alert('电话号码不能为空');return false};
        if(_address == ''){alert('地址不能为空');return false};
        let param = {
            addressee:_name,
            tel:_tel,
            address:_address,
        }
        $.ajax({
            url: config.url + '/user/returns',
            type: 'POST',
            dataType: 'json',
            data: param,
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    window.location.hash = '#/ReturnAddress'
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
                <h2 className="address-title">填写退换货地址</h2>
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
                    <span className="btn-add-address" onClick={e=>this.formSubmit(e)}>确认</span>
                </form>
            </div>
        )
    }
}
function select(state){
    return {state:state.ReturnAddress};
}
export default connect(select)(ReturnAddressAdd);