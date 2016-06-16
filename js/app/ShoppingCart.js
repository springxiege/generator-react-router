/**
 * 购物车
 */

'use strict';
import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import ShopCartList from '../components/ShopCartList'
import { 
    ShopCart
} from '../actions/ActionFuncs'

class ShoppingCart extends React.Component {
    componentDidMount() {
        document.title = '购物车';
        this.serverRequest = $.ajax({
            url: 'http://xds.51lianying.local/goods/cart',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                alert('网络错误，页面将刷新重试！');
                window.location.reload();
            },
            success:(data)=>{
                this.props.dispatch(ShopCart(data))
            },
        })
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    render(){
        return (
            <ShopCartList />
        )
        
    }
};
function select(state){
    console.log(state)
    return {state:state};
}
export default connect(select)(ShoppingCart);