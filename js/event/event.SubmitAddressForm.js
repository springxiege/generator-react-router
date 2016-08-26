import {findDOMNode} from 'react-dom'
/**
 * [SubmitAddressForm 添加、编辑地址提交]
 */
export default function SubmitAddressForm(){
    let $form      = $(findDOMNode(this.refs.form))
    let _name      = this.state.name;
    let _tel       = this.state.tel;
    let _address   = this.state.address;
    let is_default = this.state.checked ? 1 : 0;
    if(_name == ''){
        $.tips('姓名不能为空');
        $form.find('[name=name]').focus();
        return false;
    }
    if(_tel == ''){
        $.tips('电话号码不能为空');
        $form.find('[name=tel]').focus();
        return false
    };
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(_tel))){
        $.tips('请输入正确的手机号');
        $form.find('input[name=tel]').focus();
        return false;
    };
    if(_address == ''){
        $.tips('地址不能为空');
        $form.find('[name=address]').focus();
        return false
    };
    let param = {
        name:_name,
        tel:_tel,
        address:_address,
        is_default:is_default
    };
    if(!this.state.disabled){
        let type,id = this.props.params.AddressId
        if(id){
            type = 'PUT'
            id = '/' + id
        }else{
            type = 'POST'
            id = ''
        }
        $.ajax({
            url: config.url + '/user/address' + id,
            type: type,
            dataType: 'json',
            data: param,
            beforeSend:(request)=>{
                config.setRequestHeader(request);
                this.setState({
                    disabled:true
                })
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                this.setState({
                    disabled:false
                })
                if(parseInt(data.code) == 0){
                    window.location.hash = '#/Address/'+this.props.params.transfertype
                }
            }
        })
    }
}