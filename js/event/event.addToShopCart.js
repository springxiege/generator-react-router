/**
 * [addToShopCart 加入购物车]
 */
import {
    ShowAndHideSelectSku
} from '../actions/ActionFuncs'
import checkLogin from '../event/event.checkLogin'
export default function addToShopCart(type){
    _hmt.push(['_trackEvent', 'addToShopCart', 'click', '添加购物车']);
    let _this = this;
    let flag = true;
    if(!checkLogin()){return false;}
    let state          = this.props.state.GoodsDetail
    let GoodsSelectSku = state.GoodsSelectSku
    let selected       = GoodsSelectSku.selected
    let subselected    = GoodsSelectSku.subselected
    let goods_id       = null
    let addon_id       = null
    let amount         = GoodsSelectSku.count
    if(selected === null && subselected ===null){
        _this.props.dispatch(ShowAndHideSelectSku())
        if(state.data.goods_addon[0].addon[0].stock == 0){
            $.tips('库存为0，不可添加购物车')
        }
        return false;
    }
    goods_id = state.data.goods_addon[selected].goods_id
    if(subselected===null){
        addon_id = state.data.goods_addon[selected].addon[0].id
    }else{
        addon_id = state.data.goods_addon[selected].addon[subselected].id
    }
    if(flag){
        $.ajax({
            url: config.url + '/goods/cart',
            type: 'POST',
            dataType: 'json',
            data: {
                goods_id:goods_id,
                addon_id:addon_id,
                amount:amount
            },
            beforeSend:(request)=>{
                config.setRequestHeader(request);
                flag = false;
                if(!type){
                    _this.props.dispatch(ShowAndHideSelectSku())
                }
            },
            error:(error)=>{
                $.tips('加入购物车失败',1200,function(){
                    config.ProcessError(error);
                })
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    flag = true;
                    $.tips('加入购物车成功')
                }
            }
        })
    }
    
}  