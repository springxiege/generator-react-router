import '../../css/main-address.css'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
    Address,
    AddressAdd,
    AddressEdit,
    AddressDelete,
    AddressSelect,
    AddressDefault
} from '../actions/ActionFuncs'
class AddressList extends Component {
    getHTML(data){
        let _HTML = '';
        if(data.length){
            _HTML = data.map((item,index)=>{
                return (
                    <div className="main-module">
                        <div className="address">
                            <div className="address-con">
                                <label className="checked">
                                    <input type="radio" name="address" value="" id="">
                                    <h2>汤琪　131*****0570</h2>
                                    <p>浙江省杭州市西湖区万塘路252号计量大厦610</p>
                                </label>
                            </div>
                            <div className="address-edit">
                                <span className="default">默认地址</span>
                                <span>删除</span>
                                <span>编辑</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            window.location.hash = '#AddressAdd'
        }
    }
    componentDidMount(){
        this.serverRequest = $.ajax({
            url: config.url + '/user/address',   
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                console.log('beforeSend');
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render(){
        return (
            <div>address list page</div>
        )
    }
}
function select(state){
    return {state:state}
}
export default connect(select)(AddressList)