'use strict';
// 详情页底部
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {
    gotoBuy,
    ShowAndHideSelectSku
} from '../actions/ActionFuncs'
class ProductDetailFooter extends React.Component {
    gotobuy(){
        if(!window.config.isWX){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                }else{
                    if(!tradeStore.token){
                        window.location.hash = '#/Register/ProductDetails/' + this.props.detailId
                    }
                }
            }else{
                alert('This browser does not supports localStorage')
                return false;
            }
        }
        let _data      = this.props.state.GoodsDetail
        let _selectObj = _data.GoodsSelectSku
        let _select    = _selectObj.selected
        let _subselect = _selectObj.subselected
        let _count     = _selectObj.count
        let _id        = _data.data.id
        let _title     = _data.data.title
        if(_select === null && _subselect === null){
            this.props.dispatch(ShowAndHideSelectSku())
            return false;
        }
        let _addon = _data.data.goods_addon[_select].addon
        if(_addon.length === 1 && _addon[0].feature_sub === ''){
            if(parseInt(_addon[0].stock) === 0){
                $.error('库存为0，不可购买');
                return false;
            }
        }else{
            if(_subselect === null){
                $.error('请选择子规格');
                return false;
            }
            if(parseInt(_addon[_subselect].stock) === 0){
                $.error('库存为0，不可购买');
                return false;
            }
        }
        if(store.enabled){
            let goods          = {};
            goods.id           = _id;
            goods.title        = _title;
            goods.count        = _count;
            goods.select       = _select;
            goods.subselect    = _subselect;
            goods.fare         = _data.data.fare;
            goods.get_users    = _data.data.get_users;
            goods.goods_images = _data.data.goods_images;
            goods.max_price    = _data.data.max_price;
            goods.goods_addon  = _data.data.goods_addon;
            store.set('goods',goods);
        }else{
            alert('This browser does not supports localStorage')
            return false;
        }
        window.location.hash = '#/BuyList/'+_id
    }
    handleToLand(e,url){
        if(!window.config.isWX){
            if(store.enabled){
                var tradeStore = store.get('trade');
                if(!tradeStore){
                    window.location.hash = '#/Register/' + url
                }else{
                    if(!tradeStore.token){
                        window.location.hash = '#/Register/' + url
                    }else{
                        window.location.hash = '#/' + url
                    }
                }
            }else{
                alert('This browser does not supports localStorage')
            }
        }else{
            window.location.hash = '#/' + url
        }
    }
    render() {
        return (
            <footer>
                <div className="main-product-footer clearfix">
                    <div className="main-footer-btn main-footer-icon main-usercenter fl" onClick={e=>this.handleToLand(e,'UserCenter')}>
                        <a href="javascript:;">个人中心</a>
                        {/*<Link to={`/UserCenter`}>个人中心</Link>*/}
                    </div>
                    <div className="main-footer-btn main-footer-icon main-shoppingcart fl" onClick={e=>this.handleToLand(e,'ShoppingCart')}>
                        <a href="javascript:;">购物车</a>
                        {/*<Link to={`/ShoppingCart`}>购物车</Link>*/}
                    </div>
                    <div className="main-footer-btn main-footer-icon main-allgoods fl"><Link to={`/AllGoods/${this.props.userId || 1}`}>全部宝贝</Link></div>
                    <div className="main-footer-btn main-buy-now" onClick={e=>this.gotobuy(e)}><span>立即购买</span></div>
                </div>
            </footer>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state
    }
}
export default connect(select)(ProductDetailFooter);
