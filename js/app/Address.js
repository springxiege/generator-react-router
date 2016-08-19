import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
    Address,
    AddressAdd,
    AddressEdit,
    AddressDelete,
    AddressSelect,
    AddressDefault,
    AddressDeleteUpdate
} from '../actions/ActionFuncs'
class AddressList extends Component {
    getHTML(data){
        let _HTML = 'address list page is loading...';
        if(data === null || data === undefined){
            return 'something is wrong,please reload this page!'
        }
        if(data.length){
            _HTML = data.map((item,index)=>{
                return (
                    <div className="main-module" key={index}>
                        <div className="address">
                            <div className="address-con">
                                <label className={item.selected == 1 ? "checked" : ""}>
                                    <input type="radio" name="address" id={item.id} onChange={e=>this.SelectAddress(e,item.id)} />
                                    <h2>{item.name}　{item.tel}</h2>
                                    <p>{item.address}</p>
                                </label>
                            </div>
                            <div className="address-edit">
                                <span className={item.is_default == 1 ? "default" : ""} onClick={e=>this.setDefault(e,item.id)}>{item.is_default == 1 ? "默认地址" : "设为默认"}</span>
                                <span data-id={item.id} onClick={e=>this.Delete(e,item.id)}>删除</span>
                                <span data-id={item.id} onClick={e=>this.Edit(e,item.id)}>编辑</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            return (<div className="nolist">暂无地址</div>);
        }
        return _HTML;
    }
    // 添加地址
    AddressAdd(e){
        window.location.hash = '#/AddressAdd/'+this.props.params.transfertype
    }
    // 选择地址
    SelectAddress(e,id){
        this.props.dispatch(AddressSelect(id))
    }
    // 设置默认
    setDefault(e,id){
        let obj = {}
        let _data = this.props.state.data
        for (let i = 0; i < _data.length; i++) {
            let item = _data[i]
            if(parseInt(item.id) == parseInt(id)){
                obj = Object.assign({},item,{
                    _method:'PUT',
                    is_default:1
                })
                break;
            }
        }
        $.ajax({
            url: config.url + '/user/address/'+id,
            type: 'POST',
            dataType: 'json',
            data: obj,
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    this.props.dispatch(AddressDefault(id))
                }
            }
        })
        
    }
    // 删除
    Delete(e,id){
        this.props.dispatch(AddressDelete(id))
    }
    // 取消删除
    Cancel(e){
        this.props.dispatch(AddressDelete())
    }
    // 确认删除
    Confirm(e,id){
        $.ajax({
            url: config.url + '/user/address/' + id,
            type: 'POST',
            headers:{
                token:config.head
            },
            dataType: 'json',
            data: {
                _method:'DELETE'
            },
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                if(error.status === 401 && error.responseJSON.code === 1){
                    $.tips('header请求错误，将重新请求');
                    $.refreshToken(function(){
                        window.location.reload();
                    })
                }
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    this.props.dispatch(AddressDeleteUpdate(id))
                }
            }
        })
        
    }
    // 确定
    OK(e){
        switch(this.props.params.transfertype){
            case 'buy':
                window.location.hash = '#/Buy/buylist'
                break;
            case 'shopcart':
                window.location.hash = '#/Buy/shopcart'
                break;
            default:
                window.location.hash = '#/Settings'
                break;
        }
    }
    // 编辑
    Edit(e,id){
        switch(this.props.params.transfertype){
            case 'buy':
                window.location.hash = '#/AddressEdit/buy/'+id
                break;
            case 'setting':
                window.location.hash = '#/AddressEdit/setting/'+id
                break;
            case 'shopcart':
                window.location.hash = '#/AddressEdit/shopcart/'+id
            default:
                break;
        }
        
    }
    componentDidMount(){
        document.title = '我的地址'
        this.serverRequest = $.ajax({
            url: config.url + '/user/address',   
            type: 'GET',
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
                if(parseInt(data.code) == 0){
                    $.loading.hide()
                    this.props.dispatch(Address(data.data))
                    
                }
            }
        })
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render(){
        let __HTML = this.getHTML(this.props.state.data)
        return (
            <div className="main">
                <div className="add-address-btn" onClick={e=>this.AddressAdd(e)}>添加</div>
                {__HTML}
                <span className="btn-add-address" onClick={e=>this.OK(e)}>确认</span>
                <div className={this.props.state.confirm? "pop-confirm confirm" : "pop-confirm" }>
                    <div className="pop-container">
                        <div className="pop-main">
                            <i className="pop-btn-close" onClick={e=>this.Cancel(e)}></i>
                            <h2>删除地址后无法恢复</h2>
                            <div className="pop-btns clearfix">
                                <span className="pop-btn-cancle fl" onClick={e=>this.Cancel(e)}>取消</span>
                                <span className="pop-btn-ok fr" onClick={e=>this.Confirm(e,this.props.state.edit)}>确认</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state){
    return {state:state.Address};
}
export default connect(select)(AddressList);