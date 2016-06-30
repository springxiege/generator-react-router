import '../../css/main-shopcart.css'
import React,{Component} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
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
class ShopCartList extends Component {
    _ChangeSingle(e){
        let check = $(e.target).is(':checked'),
            _id = $(e.target).data('id');
        
        this.props.dispatch(SelectShopGoodsSingle(_id))
    }
    _ChangeAll(e){
        let checked = $(e.target).is(':checked');
        this.props.dispatch(SelectShopGoodsMultiple(checked))
    }
    deleteThis(e){
        e.preventDefault();
        e.stopPropagation();
        let id = $(e.target).data('id');
        this.props.dispatch(DeleteCartGoods(id))
    }
    deleteCancel(){
        this.props.dispatch(DeleteCancel())
    }
    deleteConfirm(){
        let _id = this.props.state.delete_id
        $.ajax({
            url: config.url + '/goods/cart/'+_id,
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
                    this.props.dispatch(DeleteConfirm())
                }
            }
        })
    }
    increment(e){
        let _id = $(e.target).data('id'),
            _current = this.props.state.amount[_id].count,
            _stock = $(e.target).data('stock');
        if(parseInt(_current)==parseInt(_stock)){
            return false;
        }else{
            this.props.dispatch(Increment(_id))
        }
        
    }
    decrement(e){
        let _id = $(e.target).data('id'),
            _current = this.props.state.amount[_id].count;
        if(parseInt(_current)==1){
            return false;
        }else{
            this.props.dispatch(Decrement(_id))
        }
        
    }
    _getList(){
        let data = this.props.state.data
        let html = ''
        if(data.length){
            html = data.map((item,index)=>{
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
                                <a href="#" className="fl">
                                    <img src="images/7.jpg" alt="" />
                                </a>
                                <div>
                                    <p><a href="#">{item.goods.title}</a></p>
                                    <p>{item.goods_addon.parent_addon.feature_main}  {item.goods_addon.feature_sub}</p>
                                    <p>&yen;{item.goods_addon.goods_price}<span>快递：{item.goods.fare}元</span></p>
                                    <div className="cart-setcount">
                                        <span className="fl" onClick={e=>this.decrement(e)} data-id={item.id}></span>
                                        <input type="number" name="" value={this.props.state.amount[item.id].count} id="" className="fl" readOnly />
                                        <span className="fl" onClick={e=>this.increment(e)} data-id={item.id} data-stock={item.goods_addon.stock}></span>
                                        <span className="fr">原小计：699.00元</span>
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
                        <label className={this.props.state.checkedAll?"checked fl":"fl"}><input type="checkbox" name="" id="" checked={this.props.state.checkedAll?true :false} onChange={e=>this._ChangeAll(e)} /></label>
                        <span className="fl">全选</span>
                        <p className="fr">合计：<span>{this.props.state.totalAmount}</span></p>
                    </aside>
                    <a href="#">去结算</a>
                </footer>
                <div className={this.props.state.pop}>
                    <div className="pop-container">
                        <div className="pop-main">
                            <i className="pop-btn-close"></i>
                            <h2>删除后无法恢复</h2>
                            <div className="pop-btns clearfix">
                                <span className="pop-btn-cancle fl" onClick={e=>this.deleteCancel(e)}>取消</span>
                                <span className="pop-btn-ok fr" onClick={e=>this.deleteConfirm(e)}>确认</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.ShopCart
    }
}
export default connect(select)(ShopCartList);
