import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
    ReturnAddress,
    ReturnAddressAdd,
    ReturnAddressEdit,
    ReturnAddressDelete,
    ReturnAddressSelect,
    ReturnAddressDefault,
    ReturnAddressDeleteUpdate
} from '../actions/ActionFuncs'
class ReturnAddressList extends Component {
    getHTML(data){
        let _HTML = 'address list page is loading...';
        if(data === null || data === undefined){
            return _HTML
        }
        if(data.length){
            _HTML = data.map((item,index)=>{
                return (
                    <div className="main-module" key={index}>
                        <div className="address">
                            <div className="address-con">
                                <label className={item.selected == 1 ? "checked" : ""}>
                                    <input type="radio" name="address" id={item.id} onChange={e=>this.SelectAddress(e,item.id)} />
                                    <h2>{item.addressee}　{item.tel}</h2>
                                    <p>{item.address}</p>
                                </label>
                            </div>
                            <div className="address-edit">
                                <span></span>
                                <span data-id={item.id} onClick={e=>this.Delete(e,item.id)}>删除</span>
                                <span data-id={item.id} onClick={e=>this.Edit(e,item.id)}>编辑</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            window.location.hash = '#ReturnAddressAdd'
        }
        return _HTML;
    }
    // 添加地址
    AddressAdd(e){
        window.location.hash = '#/ReturnAddressAdd'
    }
    // 选择地址
    SelectAddress(e,id){
        this.props.dispatch(ReturnAddressSelect(id))
    }
    // 删除
    Delete(e,id){
        this.props.dispatch(ReturnAddressDelete(id))
    }
    // 取消删除
    Cancel(e){
        this.props.dispatch(ReturnAddressDelete())
    }
    // 确认删除
    Confirm(e,id){
        $.ajax({
            url: config.url + '/user/returns/' + id,
            type: 'POST',
            headers:{
                token:config.head
            },
            dataType: 'json',
            data: {
                _method:'DELETE'
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code)==0){
                    this.props.dispatch(ReturnAddressDeleteUpdate(id))
                }
            }
        })
        
    }
    // 确定
    OK(e){

    }
    // 编辑
    Edit(e,id){
        window.location.hash = '#/ReturnAddressEdit/'+id
    }
    componentDidMount(){
        document.title = '退换货地址列表'
        this.serverRequest = $.ajax({
            url: config.url + '/user/returns',   
            type: 'GET',
            headers:{
                token:config.head
            },
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                console.error(error);
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    this.props.dispatch(ReturnAddress(data.data));
                    $.loading.hide();
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
    return {state:state.ReturnAddress};
}
export default connect(select)(ReturnAddressList);