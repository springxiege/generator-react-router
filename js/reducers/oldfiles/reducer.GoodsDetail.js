import {
    GOODS_DETAIL,
    GOODS_SELECT_SKU,
    GOODS_SELECT_SKU_SUB,
    GOODS_SELECTED_SKU,
    SHOW_HIDE_SELECT_SKU,
    ADD_COLLECT,
    CANCEL_COLLECT,
    REFRESHRECOMMEND,
    COUNT_INCREMENT,
    COUNT_DECREMENT,
    GET_COMMENT,
    GET_GOOD_COMMENT,
    GET_BAD_COMMENT,
    GO_TO_BUY,
    ADD_BUY,
    MINUS_BUY,
    BUY_COUNT_INCREMENT,
    BUY_COUNT_DECREMENT,
    GODDS_BUY_SKU,
    GODDS_BUY_SKU_SUB,
    UPDATA_BUYLIST
} from '../actions/ActionTypes'
// 处理数据分发到每个模块

// 评论
const CommentList = {
    data:[]
}
const GoodsSelectSku = {
    count: 1,
    isvisible: false,
    selected: null,
    subselected: null,
    market_price: 0,
    goods_price: 0,
    amountprice:0
}
const BuyList = []
const initialState = {
    userId:1,
    Collect: 0,
    BuyList:BuyList,
    CommentList: CommentList,
    GoodsSelectSku: GoodsSelectSku,
    SelectedSku: '选择：规格分类',
    activity_ids: [],
    data: {
        "title": "1",
        "snum": "1",
        "id": 1,
        "description": "1",
        "goods_images": [
            "http://s.51lianying.com/images/xds/trade/logobg.gif",
            "http://s.51lianying.com/images/xds/trade/logobg.gif",
            "http://s.51lianying.com/images/xds/trade/logobg.gif"
        ],
        "coumt_commet":{
            "bad_review":0,
            "count":0,
            "favorable_comment":0
        },
        "content": "<p><img src=\"http://s.51lianying.com/images/xds/trade/2.jpg\"><p>",
        "made_by": "1",
        "deliver_address": "1",
        "discount": "11.00",
        "fare": "1.00",
        "brokerage": 1,
        "expire": 11,
        "maintain": 0,
        "stock": 0,
        "created_at": null,
        "goodsLink": "/uyotXT.html",
        "get_shop":{},
        "goods_addon": [{
            "id": 0,
            "goods_id": 0,
            "parent_id": 0,
            "feature_main": "38",
            "feature_sub": "",
            "goods_price": "0.00",
            "market_price": "0.00",
            "stock": 1,
            "created_at": null,
            "updated_at": null,
            "deleted_at": null,
            "addon": []
        }]
    }
}
export default function GoodsDetail(state = initialState, action) {
    let _originalprice = 0
    let _count         = 1
    let _price         = 0
    let min_price      = 0
    let max_price      = 0
    let amount_price   = 0
    let _skuObj        = {}
    let _sku           = ''
    let _tempObj       = {}
    let _Array         = []
    let temArray       = []
    let _stock         = 0
    switch (action.type) {
        case GOODS_DETAIL:
            min_price = parseFloat(action.data.min_price).toFixed(2);
            max_price = parseFloat(action.data.min_shop_price).toFixed(2);
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                price: min_price,
                originalprice:max_price,
                selected: null,
                subselected: null
            })
            return Object.assign({}, state, {
                userId:action.data.user_id,
                GoodsSelectSku: _tempObj,
                CommentList:{
                    status: 2,
                    id: action.data.id,
                    list:{data:{data:[]}},
                    good_list:{data:{data:[]}},
                    bad_list:{data:{data:[]}}
                },
                SelectedSku:'选择：规格分类',
                data:action.data
            })
            break;
        case GOODS_SELECT_SKU: //选择规格一
            _price = state.data.goods_addon[action.index].addon[0][config.price];
            _originalprice = state.data.goods_addon[action.index].addon[0].goods_price;
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                selected: action.index,
                subselected: null,
                count:1,
                price:_price,
                amountprice:_price,
                market_price:_price,
                goods_price:_originalprice,
                originalprice:_originalprice
            })
            return Object.assign({}, state, {
                GoodsSelectSku: _tempObj
            })
            break;
        case GOODS_SELECT_SKU_SUB: // 选择规格二
            _price = state.data.goods_addon[state.GoodsSelectSku.selected].addon.length?state.data.goods_addon[state.GoodsSelectSku.selected].addon[action.index][config.price]:state.data.goods_addon[state.GoodsSelectSku.selected][config.price];
            _originalprice = state.data.goods_addon[state.GoodsSelectSku.selected].addon.length?state.data.goods_addon[state.GoodsSelectSku.selected].addon[action.index].goods_price:state.data.goods_addon[state.GoodsSelectSku.selected].goods_price;
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                subselected: action.index,
                market_price:_price,
                amountprice:_price,
                goods_price:_originalprice,
                count:1
            })
            return Object.assign({}, state, {
                GoodsSelectSku: _tempObj
            })
            break;
        case GOODS_SELECTED_SKU: // 显示已选择规格
            _skuObj = state.data.goods_addon[(state.GoodsSelectSku.selected || 0)]
            _sku = _skuObj.feature_main + " " + (_skuObj['addon'] && _skuObj['addon'].length && _skuObj['addon'][(state.GoodsSelectSku.subselected || 0)].feature_sub || '')
            return Object.assign({}, state, {
                SelectedSku: _sku
            })
            break;
        case SHOW_HIDE_SELECT_SKU: // 选择属性规格层的显示与隐藏
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                isvisible: !state.GoodsSelectSku.isvisible
            })
            return Object.assign({}, state, {
                GoodsSelectSku: _tempObj
            })
            break;
        case ADD_COLLECT: // 添加收藏
            return Object.assign({}, state, {
                Collect: 1
            })
            break;
        case CANCEL_COLLECT: // 取消收藏
            return Object.assign({}, state, {
                Collect: 0
            })
            break;
        case REFRESHRECOMMEND: // 刷新51推荐列表
            return Object.assign({}, state, {

            })
            break;
        case COUNT_INCREMENT: // 添加商品数量
            _count = state.GoodsSelectSku.count
            _count = _count - 0 + 1
            _price = parseFloat(state.GoodsSelectSku[config.price]).toFixed(2);
            amount_price = parseFloat(_price * _count).toFixed(2);
            _tempObj = Object.assign({},state.GoodsSelectSku,{
                count:_count,
                goods_price: _price,
                amountprice: amount_price
            })
            return Object.assign({}, state, {
                GoodsSelectSku:_tempObj
            })
            break;
        case COUNT_DECREMENT: // 减少商品数量
            _count = state.GoodsSelectSku.count
            _count = _count - 1
            _price = parseFloat(state.GoodsSelectSku[config.price]).toFixed(2);
            amount_price = parseFloat(_price * _count).toFixed(2);
            _tempObj = Object.assign({},state.GoodsSelectSku,{
                count:_count,
                goods_price: _price,
                amountprice: amount_price
            })
            return Object.assign({}, state, {
                GoodsSelectSku:_tempObj
            })
            break;
        case GET_COMMENT: // 获取所有评论
            _tempObj = Object.assign({},state.CommentList,{
                data: action.data
            })
            return Object.assign({},state,{
                CommentList:_tempObj
            })
            break;
        case GET_GOOD_COMMENT: // 获取好评列表
            _tempObj = Object.assign({},state.CommentList,{
                status: 0,
                id: state.data.id,
                good_list:action.data
            })
            return Object.assign({}, state, {
                CommentList:_tempObj
            })
            break;
        case GET_BAD_COMMENT: // 获取差评列表
            _tempObj = Object.assign({},state.CommentList,{
                status: 1,
                id: state.data.id,
                bad_list:action.data
            })
            return Object.assign({}, state, {
                CommentList:_tempObj
            })
            break;
        case GO_TO_BUY: // 立即购买
            // 首先获取传递的数据
            _tempObj = action.data;
            _price = _tempObj.goods_addon[_tempObj.select].addon[_tempObj.subselect||0][config.price];
            _originalprice = _tempObj.goods_addon[_tempObj.select].addon[_tempObj.subselect||0].goods_price;
            _stock = _tempObj.goods_addon[_tempObj.select].addon[_tempObj.subselect||0].stock;
            _sku = _tempObj.goods_addon[_tempObj.select].feature_main + ' ' + _tempObj.goods_addon[_tempObj.select].addon[_tempObj.subselect||0].feature_sub;
            _tempObj = Object.assign({},state.BuyList[0],{
                title:_tempObj.title,
                fare:_tempObj.fare,
                count:_tempObj.count,
                goods_id:_tempObj.id,
                addon_id:_tempObj.goods_addon[_tempObj.select].addon[_tempObj.subselect||0].id,
                goods_addon:_tempObj.goods_addon,
                selected:_tempObj.select,
                subselected:_tempObj.subselect,
                price:_price,
                originalprice:_originalprice,
                marketprice:_price,
                images:_tempObj.goods_images,
                sku:_sku,
                stock:_stock
            })
            _Array[0] = _tempObj
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case UPDATA_BUYLIST:
            return Object.assign({},state,{
                BuyList:action.data
            })
            break;
        case BUY_COUNT_INCREMENT: // 增加购买数量
            _Array = state.BuyList
            _count = state.BuyList[action.index].count
            _Array[action.index] = Object.assign({},state.BuyList[action.index],{
                count:(++_count)
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case BUY_COUNT_DECREMENT: // 减少购买数量
            _Array = state.BuyList
            _count = state.BuyList[action.index].count
            _Array[action.index] = Object.assign({},state.BuyList[action.index],{
                count:(--_count)
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case GODDS_BUY_SKU: // 购买商品的规格重新选择
            _Array = state.BuyList
            _Array[action.data.index] = Object.assign({},state.BuyList[action.data.index],{
                selected:action.data.selected,
                subselected:null,
                goods_id:state.BuyList[action.data.index].goods_id,
                addon_id:state.BuyList[action.data.index].goods_addon[action.data.selected||0].addon[0].id,
                sku:state.BuyList[action.data.index].goods_addon[action.data.selected].feature_main,
                price:state.BuyList[action.data.index].goods_addon[action.data.selected].addon[0][config.price],
                stock:state.BuyList[action.data.index].goods_addon[action.data.selected].addon[0].stock
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case GODDS_BUY_SKU_SUB: // 购买商品的规格重新选择
            _Array = state.BuyList
            _Array[action.data.index] = Object.assign({},state.BuyList[action.data.index],{
                subselected:action.data.subselected,
                goods_id:state.BuyList[action.data.index].goods_id,
                addon_id:state.BuyList[action.data.index].goods_addon[state.BuyList[action.data.index].selected].addon[action.data.subselected].id,
                sku:state.BuyList[action.data.index].goods_addon[state.BuyList[action.data.index].selected].feature_main + ' ' +state.BuyList[action.data.index].goods_addon[state.BuyList[action.data.index].selected].addon[action.data.subselected].feature_sub,
                price:state.BuyList[action.data.index].goods_addon[state.BuyList[action.data.index].selected].addon[action.data.subselected][config.price],
                stock:state.BuyList[action.data.index].goods_addon[state.BuyList[action.data.index].selected].addon[action.data.subselected].stock
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case ADD_BUY: // 增加同商品购买
            _Array = state.BuyList
            _tempObj = Object.assign({},_Array[action.index])
            _tempObj.count=1
            _Array.splice((action.index-0+1),0,_tempObj)
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case MINUS_BUY: // 删除同商品购买
            _Array = state.BuyList
            _Array.splice(action.index,1)
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        default:
            return state;
            break;
    }
}