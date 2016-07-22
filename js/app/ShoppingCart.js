/**
 * 购物车
 */
'use strict';
import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { 
    ShopCart,
    Increment,
    Decrement,
    DeleteCartGoods,
    DeleteCancel,
    DeleteConfirm,
    SelectShopGoodsSingle,
    SelectShopGoodsMultiple
} from '../actions/ActionFuncs'

class ShoppingCart extends React.Component {
    componentDidMount() {
        document.title = '购物车';
        this.serverRequest = $.ajax({
            url: config.url + '/goods/cart',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show();
            },
            error:(error)=>{
                alert('网络错误，页面将刷新重试！');
                window.location.reload();
            },
            success:(data)=>{
                if(parseInt(data.code) === 0){
                    this.props.dispatch(ShopCart(data));
                    $.loading.hide()
                }
                
            },
        })
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    _ChangeSingle(e){
        let check = $(findDOMNode(e.target)).is(':checked'),
            _id = $(findDOMNode(e.target)).data('id');
        
        this.props.dispatch(SelectShopGoodsSingle(_id))
    }
    _ChangeAll(e){
        let checked = $(findDOMNode(e.target)).is(':checked');
        this.props.dispatch(SelectShopGoodsMultiple(checked))
    }
    deleteThis(e){
        let _this = this;
        let id = $(findDOMNode(e.target)).data('id');
        let $parent = $(findDOMNode(e.target)).closest('.main-module')
        $.confirm({
            content:'删除后无法恢复',
            okBtn:function(){
                $.ajax({
                    url: config.url + '/goods/cart/'+id,
                    type: 'POST',
                    dataType: 'json',
                    data: {_method: 'delete'},
                    beforeSend:function(){

                    },
                    error:function(error){
                        console.error(error)
                    },
                    success:(data)=>{
                        if(parseInt(data.code)==0){
                            $.error('删除成功！')
                            _this.props.dispatch(DeleteConfirm(id))
                        }
                    }
                })
            }
        })
    }
    increment(e){
        let _id = $(findDOMNode(e.target)).data('id'),
            _current = this.props.state.amount[_id].count,
            _stock = $(findDOMNode(e.target)).data('stock'),
            $this = this;
        if(parseInt(_current)==parseInt(_stock)){
            return false;
        }else{
            $.ajax({
                url: config.url + '/goods/cart/' + _id,
                type: 'POST',
                dataType: 'json',
                data: {
                    _method:'PUT',
                    amount:++_current
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    console.log(data)
                    if(parseInt(data.code) == 0){
                        $this.props.dispatch(Increment(_id))
                    }
                }
            })
            
            
        }
        
    }
    decrement(e){
        let _id = $(findDOMNode(e.target)).data('id'),
            _current = this.props.state.amount[_id].count,
            $this = this;
        if(parseInt(_current)==1){
            return false;
        }else{
            $.ajax({
                url: config.url + '/goods/cart/' + _id,
                type: 'POST',
                dataType: 'json',
                data: {
                    _method:'PUT',
                    amount:--_current
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    console.log(data)
                    if(parseInt(data.code) == 0){
                        $this.props.dispatch(Decrement(_id))
                    }
                }
            })
            
        }
        
    }
    _getList(){
        let data = this.props.state.data
        let html = ''
        if(data.length){
            html = data.map((item,index)=>{
                let _link = '/ProductDetails/'+item.goods_id
                return (
                    <div className="main-module" key={index}>
                        <div className="cart-info">
                            <div className="cart-info-header clearfix">
                                <label className={this.props.state.amount[item.id].checked?"checked fl":"fl"}><input type="checkbox" name="product" onChange={e=>this._ChangeSingle(e)} data-id={item.id} checked={this.props.state.amount[item.id].checked?true:false} /></label>
                                <img src="images/3.jpg" alt="" className="fl" />
                                <p className="fl">王小二时尚卖手</p>
                                <a href="javascript:;" className="fr" data-id={item.id} onClick={e=>this.deleteThis(e)}>删除</a>
                            </div>
                            <div className="cart-info-item clearfix">
                                <Link to={_link} className="fl"><img src={item.goods.goods_images[0]||item.goods.goods_images[1]||item.goods.goods_images[2]||'images/7.jpg'} alt="" /></Link>
                                <div>
                                    <p><Link to={_link}>{item.goods.title}</Link></p>
                                    <p>{item.goods_addon.parent_addon ? item.goods_addon.parent_addon.feature_main : ""}  {item.goods_addon.feature_sub}</p>
                                    <p>&yen;{item.goods_addon.goods_price}<span>快递：{item.goods.fare}元</span></p>
                                    <div className="cart-setcount">
                                        <span className="fl" onClick={e=>this.decrement(e)} data-id={item.id}></span>
                                        <input type="number" name="" value={this.props.state.amount[item.id].count} id="" className="fl" readOnly />
                                        <span className="fl" onClick={e=>this.increment(e)} data-id={item.id} data-stock={item.goods_addon.stock}></span>
                                        {/*<span className="fr">原小计：699.00元</span>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="cart-info-footer">
                                <span className="fl">已加入时间：{item.create_at}</span>
                                <p className="up fr">现价小计：&yen;{this.props.state.amount[item.id].totalPrice}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            html =  (
                <div className="main-cart-list no-cart-list">
                    <p>购物车空空如也</p>
                    <p>不如试试51推荐</p>
                </div>
            )
        }
        return html;
    }
    render(){
        let _html = this._getList();
        console.log(this.props.state)
        return (
            <div className="ShopCartList">
                <div className="main">
                    <div className="cart-header">加入购物车，价格无所遁形！</div>
                    <div className="cart-container">
                        {_html}
                    </div>
                </div>
                <footer className="cart-footer clearfix">
                    <aside className="fl">
                        <label className={this.props.state.checkedAll?"checked fl":"fl"}><input type="checkbox" name="" id="allgoods" checked={this.props.state.checkedAll?true :false} onChange={e=>this._ChangeAll(e)} /></label>
                        <label className="fl" htmlFor="allgoods">全选</label>
                        <p className="fr">合计：<span>{this.props.state.totalAmount}</span></p>
                    </aside>
                    <Link to="/Buy/shopcart">去结算</Link>
                </footer>
            </div>
        )
    }
};
function select(state){
    return {state:state.ShopCart};
}
export default connect(select)(ShoppingCart);