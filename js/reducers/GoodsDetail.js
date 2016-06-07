import $ from 'jquery'
import {
    GOODS_DETAIL,
    GOODS_SELECT_SKU,
    GOODS_SELECT_SKU_SUB,
    GOODS_SELECTED_SKU,
    SHOW_HIDE_SELECT_SKU,
    ADD_COLLECT,
    CANCEL_COLLECT,
    REFRESHRECOMMEND,
    INCREMENT,
    DECREMENT,
    GET_GOOD_COMMENT,
    GET_BAD_COMMENT
} from '../actions/ActionTypes'
import ProductDate from '../common/ProductDate'
import commentDate from '../common/commentDate'
// 处理数据分发到每个模块
// 收藏
const Collect = {
    status:0,
    clsName:'main-collect-icon fr'
}
// 轮播图片
const Images = ProductDate.goods_images
// 评论
const CommentList = {
    status:0,
    data:[commentDate,commentDate]
}
let _addon = []
for (let i = 0; i < ProductDate.goods_addon.length; i++) {
    let item = ProductDate.goods_addon[i].addon
    _addon[i] = item
}
let _originalprice = ProductDate.goods_addon[0].addon.length ? ProductDate.goods_addon[0].addon[0].goods_price :ProductDate.goods_addon[0].goods_price
const GoodsSelectSku = {
    count:1,
    isvisible:0,
    selected:0,
    subselected:0,
    price:_originalprice,
    originalprice:_originalprice,
    goods_addon:ProductDate.goods_addon,
    addon:_addon,
    fare:ProductDate.fare
}
const SelectedSku = {
    sku:"选择：规格分类"
}
const ForSale = {
    snum:ProductDate.snum,
    madeby:ProductDate.madeby,
    expire:ProductDate.expire,
    maintain:ProductDate.maintain,
    deliver_address:ProductDate.deliver_address
}
const initialState = {
    Collect:Collect,
    CommentList:CommentList,
    GoodsSelectSku:GoodsSelectSku,
    SelectedSku:SelectedSku,
    Images:Images,
    ForSale:ForSale,
    Description:ProductDate.Description,
    title:ProductDate.title,
    id:ProductDate.id,
    content:ProductDate.content,
    discount:ProductDate.discount,
    fare:ProductDate.fare,
    brokerage:ProductDate.brokerage,
    is_activity:ProductDate.is_activity,
    activity_ids:[],
    is_legal:ProductDate.is_legal
}
export default function GoodsDetail(state=initialState,action){
    let _originalprice = 0,
        _skudata = [],
        _sku = '',
        _sku_sub = '',
        _sku_all = '',
        _usku = {},
        _count = 1,
        _price = 0;
    switch (action.type) {
        case GOODS_DETAIL:
            alert(1)
            break;
        case GOODS_SELECT_SKU: //选择规格一
            _skudata = state.GoodsSelectSku.goods_addon
            _originalprice = (_skudata[parseInt(action.index)]['addon'].length ? _skudata[parseInt(action.index)]['addon'][0]['goods_price'] : _skudata[parseInt(action.index)]['goods_price'])
            _usku = Object.assign({},state.GoodsSelectSku,{
                selected:parseInt(action.index),
                subselected:0,
                count:1,
                price:_originalprice,
                originalprice:_originalprice
            })
            return Object.assign({},state,{
                GoodsSelectSku:_usku
            })
            break;
        case GOODS_SELECT_SKU_SUB: // 选择规格二
            _skudata = state.GoodsSelectSku.goods_addon[state.GoodsSelectSku.selected]
            _originalprice = _skudata['addon'][parseInt(action.index)]['goods_price']
            _usku = Object.assign({},state.GoodsSelectSku,{
                subselected:parseInt(action.index),
                count:1,
                price:_originalprice,
                originalprice:_originalprice
            })
            return Object.assign({},state,{
                GoodsSelectSku:_usku
            })
            break;
        case GOODS_SELECTED_SKU: // 显示已选择规格
            _skudata = action.data
            _sku = _skudata.goods_addon[_skudata.selected]['feature_main'] || ''
            _sku_sub = _skudata.addon[_skudata.selected].length ? _skudata.addon[_skudata.selected][_skudata.subselected]['feature_sub'] : ''
            _sku_all = _sku + ' ' + _sku_sub
            _usku = Object.assign({},SelectedSku,{
                sku:_sku_all
            })
            return Object.assign({},state,{
                SelectedSku:_usku
            })
            break;
        case SHOW_HIDE_SELECT_SKU: // 选择属性规格层的显示与隐藏
            let _GoodsSelectSku = Object.assign({},state.GoodsSelectSku,{
                isvisible:!state.GoodsSelectSku.isvisible
            })
            return Object.assign({},state,{
                GoodsSelectSku:_GoodsSelectSku
            })
            break;
        case ADD_COLLECT: // 添加收藏
            let _is_collect = Object.assign({},state.Collect,{
                status:1,
                clsName:'main-collect-icon collected fr'
            })
            return Object.assign({},state,{
                Collect:_is_collect
            })
            break;
        case CANCEL_COLLECT: // 取消收藏
            let _un_collect = Object.assign({},state.Collect,{
                status:0,
                clsName:'main-collect-icon fr'
            })
            return Object.assign({},state,{
                Collect:_un_collect
            })
            break;
        case REFRESHRECOMMEND: // 刷新51推荐列表
            alert(8)
            break;
        case INCREMENT: // 添加商品数量
            _count = state.GoodsSelectSku.count+1
            _price = _count*state.GoodsSelectSku.originalprice
            let _in_GoodsSelectSku = Object.assign({},state.GoodsSelectSku,{
                count:_count,
                price:_price
            })
            return Object.assign({},state,{
                GoodsSelectSku: _in_GoodsSelectSku
            })
            break;
        case DECREMENT: // 减少商品数量
            _count = state.GoodsSelectSku.count-1
            _price = _count*state.GoodsSelectSku.originalprice
            let _de_GoodsSelectSku = Object.assign({},state.GoodsSelectSku,{
                count:_count,
                price:_price
            })
            return Object.assign({},state,{
                GoodsSelectSku: _de_GoodsSelectSku
            })
            break;
        case GET_GOOD_COMMENT: // 获取好评列表
            console.log(state)
            let _good_comment = Object.assign({},state.CommentList,{
                status:0,
                data:[state.CommentList.data[0],state.CommentList.data[1]]
            })
            return Object.assign({},state,{
                CommentList:_good_comment
            })
            break;
        case GET_BAD_COMMENT: // 获取差评列表
            let _bad_comment = Object.assign({},state.CommentList,{
                status:1,
                data:[state.CommentList.data[0],state.CommentList.data[1]]
            })
            return Object.assign({},state,{
                CommentList:_bad_comment
            })
            break;
        default:
            return state;
            break;
    }
}
