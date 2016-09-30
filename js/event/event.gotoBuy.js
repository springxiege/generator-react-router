/**
 * [gotoBuy 立即购买]
 * @return {[type]} [description]
 */
import {
    ShowAndHideSelectSku
} from '../actions/ActionFuncs'
import checkLogin from '../event/event.checkLogin'
export default function doBuy(){
    _hmt.push(['_trackEvent', 'BuyItNow', 'click', '立即购买']);
    if(!checkLogin()){return false;}
    let _data      = this.props.state
    let _selectObj = _data.GoodsSelectSku
    let _select    = _selectObj.selected
    let _subselect = _selectObj.subselected
    let _count     = _selectObj.count
    let _id        = _data.data.id
    let _title     = _data.data.title
    if(_select === null && _subselect === null){
        if(_selectObj.isvisible){
            $.tips('请选择规格');
            return false;
        }
        this.props.dispatch(ShowAndHideSelectSku());
        return false;
    }
    if(_data.data.goods_addon[_select].addon.length === 1 && _data.data.goods_addon[_select].addon[0].stock == 0){
        $.tips('库存为0，不可购买')
        return false;
    }
    let _addon = _data.data.goods_addon[_select].addon
    if(_addon.length === 1 && _addon[0].feature_sub === ''){
        if(parseInt(_addon[0].stock) === 0){
            $.tips('库存为0，不可购买');
            return false;
        }
    }else{
        if(_subselect === null){
            $.tips('请选择子规格');
            return false;
        }
        if(parseInt(_addon[_subselect].stock) === 0){
            $.tips('库存为0，不可购买');
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
        goods.get_shop    = _data.data.get_shop;
        goods.goods_images = _data.data.goods_images;
        goods.max_price    = _data.data.max_price;
        goods.goods_addon  = _data.data.goods_addon;
        goods.goodsLink    = _data.data.goodsLink;
        store.set('goods',goods);
    }else{
        alert('This browser does not supports localStorage')
        return false;
    }
    window.location.hash = '#/BuyList/'+_id
}