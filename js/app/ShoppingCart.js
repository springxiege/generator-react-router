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
            beforeSend:(request)=>{
                $.loading.show();
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                }
            },
            error:(error)=>{
                alert('网络错误，页面将刷新重试！');
                // window.location.reload();
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
                    type: 'delete',
                    dataType: 'json',
                    data: {},
                    beforeSend:function(request){
                        if(config.head!=''){
                            request.setRequestHeader("Authorization", "Bearer " + config.head);
                        }
                    },
                    error:function(error){
                        console.error(error)
                    },
                    success:(data)=>{
                        if(parseInt(data.code)==0){
                            $.error('删除成功！')
                            _this.props.dispatch(DeleteConfirm(id))
                        }else{
                            $.error(data.data.msg)
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
                headers:{
                    token:config.head
                },
                dataType: 'json',
                data: {
                    _method:'PUT',
                    amount:++_current
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    // console.log(data)
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
                headers:{
                    token:config.head
                },
                dataType: 'json',
                data: {
                    _method:'PUT',
                    amount:--_current
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    // console.log(data)
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
                                <img src={item.goods.get_user_profile.shop_logo||"/images/shop_logo.gif"} alt="" className="fl" />
                                <p className="fl">{item.goods.get_user_profile.shop_name}</p>
                                <a href="javascript:;" className="fr" data-id={item.id} onClick={e=>this.deleteThis(e)}>删除</a>
                            </div>
                            <div className="cart-info-item clearfix">
                                <Link to={_link} className="fl"><img src={item.goods.goods_images[0]||item.goods.goods_images[1]||item.goods.goods_images[2]||'images/7.jpg'} alt="" /></Link>
                                <div>
                                    <p><Link to={_link}>{item.goods.title}</Link></p>
                                    {item.goods_addon?(
                                        <p>{item.goods_addon.parent_addon ? item.goods_addon.parent_addon.feature_main : ""}  {item.goods_addon.feature_sub}</p>
                                    ):(
                                        <p>暂无</p>
                                    )}
                                    
                                    <p>&yen;{item.goods_addon?item.goods_addon.goods_price:0}<span>快递：{item.goods.fare}元</span></p>
                                    <div className="cart-setcount">
                                        <span className="fl" onClick={e=>this.decrement(e)} data-id={item.id}></span>
                                        <input type="number" name="" value={this.props.state.amount[item.id].count} id="" className="fl" readOnly />
                                        <span className="fl" onClick={e=>this.increment(e)} data-id={item.id} data-stock={item.goods_addon?item.goods_addon.stock:0}></span>
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
    // 结算，跳转前将已选数据存入localstorage
    handleBilling(e){
        let _state = this.props.state
        let _Array = _state.data;
        let _mapDate = [];
        let _trade = {};
        $.each(_Array,function(index,item) {
            if(_trade[item.goods.get_user_profile.user_id] === undefined){
                _trade[item.goods.get_user_profile.user_id]          = {};
                _trade[item.goods.get_user_profile.user_id].list     = [];
                _trade[item.goods.get_user_profile.user_id].user     = {};
                _trade[item.goods.get_user_profile.user_id].user.user_id  = item.goods.get_user_profile.user_id;
                _trade[item.goods.get_user_profile.user_id].user.logo     = item.goods.get_user_profile.logo||'/images/shop_logo.gif';
                _trade[item.goods.get_user_profile.user_id].user.userName = item.goods.get_user_profile.shop_name;
            }
            if(_state.amount[item.id].checked){
                let _Obj           = {};
                _Obj.count         = item.amount;
                _Obj.goods_addon   = item.goods_addon;
                _Obj.title          = item.goods.title;
                _Obj.images         = item.goods.goods_images[0];
                _Obj.price         = item.goods_addon.goods_price;
                _Obj.originalprice = item.goods.max_price;
                _Obj.fare          = item.goods.fare;
                _Obj.is_activity   = 0;
                _trade[item.goods.get_user_profile.user_id].list.push(_Obj) 
            }
        });
        $.each(_trade, function(index, val) {
            _mapDate.push(val)
        });
        if(_mapDate.length && !_mapDate[0].list.length){
            $.error('请选择商品后再购买');
            return false;
        }
        // 存入数据供合并付款页面使用，当生成订单时清除缓存数据
        if(store.enabled){
            config.setStorage('ShopCartList','data',_mapDate);
            window.location.hash = '#/Buy/shopcart'
        }else{
            alert('This browser does not supports localStorage')
        }
    }
    render(){
        let _html = this._getList();
        // console.log(this.props.state)
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
                    <a href="javascript:;" onClick={e=>this.handleBilling(e)}>去结算</a>
                    {/*<Link to="/Buy/shopcart">去结算</Link>*/}
                </footer>
            </div>
        )
    }
};
function select(state){
    return {state:state.ShopCart};
}
export default connect(select)(ShoppingCart);