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
    DeleteConfirm,
    SelectShopGoodsSingle,
    SelectShopGoodsMultiple
} from '../actions/ActionFuncs'
import CommonImage from '../components/CommonImage'
import CommonLogo from '../components/CommonLogo'
// import scrollLoading from '../event/event.scrollLoading'
class ShoppingCart extends React.Component {
    constructor(){
        super();
        // this.scrollLoading = scrollLoading.bind(this);
    }
    componentDidMount() {
        document.title = '我的购物车';
        this.serverRequest = $.ajax({
            url: config.url + '/goods/cart',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:(request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code) === 0){
                    this.props.dispatch(ShopCart(data));
                    $.loading.hide();
                    // this.scrollLoading();
                    // window.addEventListener('scroll',this.scrollLoading);
                }
                
            },
        })
    }
    componentDidUpdate(prevProps, prevState) {
        
    }
    componentWillUnmount() {
        this.serverRequest.abort();
        // window.removeEventListener('scroll',this.scrollLoading);
    }
    _ChangeSingle(id,stock){
        if(parseInt(stock) === 0){
            $.tips('库存为0，不可购买')
        }else{
            this.props.dispatch(SelectShopGoodsSingle(id))
        }
    }
    _ChangeAll(e){
        let data = this.props.state.data;
        let flag = true;
        if(data.length){
            $.each(data, function(index, val) {
                 if(val.goods_addon && parseInt(val.goods_addon.stock) > 0){
                    flag = true;
                 }else{
                    flag = false;
                    return false;
                 }
            });
        }else{
            $.tips('购物车暂无商品')
            return false;
        }
        if(flag){
            let checked = $(findDOMNode(e.target)).is(':checked');
            this.props.dispatch(SelectShopGoodsMultiple(checked))
        }else{
            $.tips('存在下架商品或库存为0商品，不可全选')
            // $(findDOMNode(e.target)).attr('checked',false)
        }
        
    }
    deleteThis(e,id){
        let _this = this;
        $.confirm({
            content:'删除后无法恢复',
            okBtn:function(){
                $.ajax({
                    url: config.url + '/goods/cart/'+id,
                    type: 'delete',
                    dataType: 'json',
                    data: {},
                    beforeSend:function(request){
                        config.setRequestHeader(request);
                    },
                    error:function(error){
                        config.ProcessError(error);
                    },
                    success:(data)=>{
                        if(parseInt(data.code)==0){
                            $.tips('删除成功！')
                            _this.props.dispatch(DeleteConfirm(id));
                        }else{
                            $.tips(data.data.msg)
                        }
                    }
                })
            }
        })
    }
    increment(id,stock){
        let _current = this.props.state.amount[id].count,
            $this = this;
        if(parseInt(_current) >= parseInt(stock)){
            return false;
        }else{
            $.ajax({
                url: config.url + '/goods/cart/addto/' + id,
                type: 'PUT',
                dataType: 'json',
                data: {
                    amount:++_current
                },
                beforeSend:function(request){
                    config.setRequestHeader(request);
                },
                error:(error)=>{
                    config.ProcessError(error);
                },
                success:(data)=>{
                    if(parseInt(data.code) == 0){
                        $this.props.dispatch(Increment(id))
                    }
                }
            })
        }
        
    }
    decrement(id){
        let _current = this.props.state.amount[id].count,
            $this = this;
        if(parseInt(_current) <= 1){
            return false;
        }else{
            $.ajax({
                url: config.url + '/goods/cart/reduce/' + id,
                type: 'PUT',
                dataType: 'json',
                data: {
                    amount:--_current
                },
                beforeSend:function(request){
                    config.setRequestHeader(request);
                },
                error:(error)=>{
                    config.ProcessError(error);
                },
                success:(data)=>{
                    // console.log(data)
                    if(parseInt(data.code) == 0){
                        $this.props.dispatch(Decrement(id))
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
                return (
                    <div className="main-module" key={index}>
                        <div className="cart-info">
                            {item.goods?(
                                <div className="cart-info-header clearfix">
                                    <label className={this.props.state.amount[item.id].checked?"checked fl":"fl"}><input type="checkbox" name="product" onChange={()=>this._ChangeSingle(item.id,item.goods_addon.stock)} data-id={item.id} checked={this.props.state.amount[item.id].checked?true:false} /></label>
                                    <CommonLogo src={item.goods.get_user_profile?item.goods.get_user_profile.shop_logo:"/images/shop_logo.gif"} className="fl" />
                                    <p className="fl">{item.goods.get_user_profile?item.goods.get_user_profile.shop_name:"我要联赢商家"}</p>
                                    <a href="javascript:;" className="fr" data-id={item.id} onClick={e=>this.deleteThis(e,item.id)}>删除</a>
                                </div>
                            ):(
                                <div className="cart-info-header clearfix">
                                    <label className="fl"><input type="checkbox" name="product" onChange={e=>this._ChangeSingle(e,item.id,0)} data-id={item.id} /></label>
                                    <CommonLogo src="/images/shop_logo.gif" className="fl" />
                                    <p className="fl">该商品已被删除</p>
                                    <a href="javascript:;" className="fr" data-id={item.id} onClick={e=>this.deleteThis(e,item.id)}>删除</a>
                                </div>
                            )}
                            
                            <div className="cart-info-item clearfix">
                                <a href={item.goods?item.goods.goodsLink:""} className="fl">
                                    {item.goods?(
                                        <CommonImage src={item.goods.goods_images} />
                                    ):(
                                        <CommonImage src={["/images/logobg_mini.gif"]} />
                                    )}
                                </a>
                                <div>
                                    <p><a href={item.goods?item.goods.goodsLink:""}>{item.goods?item.goods.title:"此商品已被商家删除，请在购物车中清除此商品"}</a></p>
                                    {item.goods_addon?(
                                        <p>{item.goods_addon.parent_addon ? item.goods_addon.parent_addon.feature_main : ""}  {item.goods_addon.feature_sub}</p>
                                    ):(
                                        <p>暂无</p>
                                    )}
                                    
                                    <p>&yen;{`${item.goods_addon ? parseFloat(item.goods_addon.goods_price).toFixed(2) : 0.00}`}<span>快递：{`${parseFloat(item.goods?item.goods.fare:0).toFixed(2)}`}元</span></p>
                                    <div className="cart-setcount">
                                        <span className={this.props.state.amount[item.id].count==1?"disabled fl":"fl"} onClick={()=>this.decrement(item.id)}></span>
                                        <input type="number" name="" value={this.props.state.amount[item.id].count} id="" className="fl" readOnly />
                                        <span className={item.goods_addon ? this.props.state.amount[item.id].count>= item.goods_addon.stock ? "disabled fl" : "fl" : "fl"} onClick={()=>this.increment(item.id,item.goods_addon?item.goods_addon.stock:0)}></span>
                                        {/*<span className="fr">原小计：699.00元</span>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="cart-info-footer">
                                <span className="fl">{item.created_at}</span>
                                <p className="up fr">现价小计：&yen;{`${this.props.state.amount[item.id].totalPrice.toFixed(2)}`}</p>
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
                _trade[item.goods.get_user_profile.user_id].user.shop_logo     = item.goods.get_user_profile.shop_logo||'/images/shop_logo.gif';
                _trade[item.goods.get_user_profile.user_id].user.shop_name = item.goods.get_user_profile.shop_name;
            }
            if(_state.amount[item.id].checked){
                let _Obj           = {};
                _Obj.count         = _state.amount[item.id].count;
                _Obj.goods_addon   = item.goods_addon;
                _Obj.title          = item.goods.title;
                _Obj.images         = item.goods.goods_images;
                _Obj.price         = item.goods_addon.goods_price;
                _Obj.originalprice = item.goods.max_price;
                _Obj.fare          = item.goods.fare;
                _Obj.is_activity   = 0;
                _Obj.goods_id      = item.goods_id;
                _trade[item.goods.get_user_profile.user_id].list.push(_Obj) 
            }
        });
        if(!$.isEmptyObject(_trade)){
            $.each(_trade, function(index, val) {
                if(val.list.length){
                    _mapDate.push(val)
                }
            });
        }
        // 过滤空数据
        if(!_mapDate.length){
            $.tips('请选择商品后再购买');
            return false;
        }else{
            if(!_mapDate[0].list.length){
                $.tips('请选择商品后再购买');
                return false;
            }
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
                        <p className="fr">合计：<span>&yen;{this.props.state.totalAmount}</span></p>
                    </aside>
                    <a href="javascript:;" onClick={e=>this.handleBilling(e)}>去结算</a>
                </footer>
            </div>
        )
    }
};
function select(state){
    return {state:state.ShopCart};
}
export default connect(select)(ShoppingCart);