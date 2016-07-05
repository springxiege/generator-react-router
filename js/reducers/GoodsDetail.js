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
    GODDS_BUY_SKU_SUB
} from '../actions/ActionTypes'
import commentDate from '../common/commentDate'
// 处理数据分发到每个模块

// 评论
const CommentList = {
    status: 2,
    id: 1,
    list:{data:{data:[]}},
    good_list:{data:{data:[]}},
    bad_list:{data:{data:[]}}
}
const GoodsSelectSku = {
    count: 1,
    isvisible: false,
    selected: null,
    subselected: null,
    price: 0,
    originalprice: 0
}
const BuyList = [
    {
        count:1,
        selected:null,
        subselected:null,
        price:0,
        fare:0,
        originalprice:0,
        totalprice:0,
        title:'占位标题',
        images:'images/7.jpg',
        data:[]
    }
]
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
            "/images/1.jpg",
            "/images/1.jpg",
            "/images/1.jpg"
        ],
        "content": "<p><img src=\"/images/2.jpg\"><p>",
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
    let _skuObj        = {}
    let _sku           = ''
    let _tempObj       = {}
    let _Array         = []
    switch (action.type) {
        case GOODS_DETAIL:
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                price: action.data.min_price+'~'+action.data.max_price,
                originalprice:action.data.max_price
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
                data:action.data
            })
            break;
        case GOODS_SELECT_SKU: //选择规格一
            _price = state.data.goods_addon[action.index].addon.length ? state.data.goods_addon[action.index].addon[0].goods_price : state.data.goods_addon[action.index].goods_price
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                selected: action.index,
                subselected: null,
                count:1,
                price:_price,
                originalprice:_price
            })
            return Object.assign({}, state, {
                GoodsSelectSku: _tempObj
            })
            break;
        case GOODS_SELECT_SKU_SUB: // 选择规格二
            _price = state.data.goods_addon[state.GoodsSelectSku.selected].addon.length?state.data.goods_addon[state.GoodsSelectSku.selected].addon[action.index].goods_price:state.data.goods_addon[state.GoodsSelectSku.selected].goods_price
            _tempObj = Object.assign({}, state.GoodsSelectSku, {
                subselected: action.index,
                price:_price,
                originalprice:_price,
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
            _tempObj = Object.assign({},state.GoodsSelectSku,{
                count:++state.GoodsSelectSku.count,
                price: (state.GoodsSelectSku.originalprice*state.GoodsSelectSku.count).toFixed(2)
            })
            return Object.assign({}, state, {
                GoodsSelectSku:_tempObj
            })
            break;
        case COUNT_DECREMENT: // 减少商品数量
            _tempObj = Object.assign({},state.GoodsSelectSku,{
                count:--state.GoodsSelectSku.count,
                price: (state.GoodsSelectSku.originalprice*state.GoodsSelectSku.count).toFixed(2)
            })
            return Object.assign({}, state, {
                GoodsSelectSku:_tempObj
            })
            break;
        case GET_COMMENT: // 获取所有评论
            _tempObj = Object.assign({},state.CommentList,{
                status: 2,
                id: state.data.id,
                list: action.data

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
            _price = action.data[state.GoodsSelectSku.selected||0].addon.length ? action.data[state.GoodsSelectSku.selected||0].addon[state.GoodsSelectSku.subselected||0].goods_price : action.data[state.GoodsSelectSku.selected||0].goods_price
            _count = action.data[state.GoodsSelectSku.selected||0].addon.length ? action.data[state.GoodsSelectSku.selected||0].addon[state.GoodsSelectSku.subselected||0].market_price : action.data[state.GoodsSelectSku.selected||0].market_price
            _tempObj = Object.assign({},state.BuyList[0],{
                title:state.data.title,
                fare:state.data.fare,
                count:state.GoodsSelectSku.count,
                selected:state.GoodsSelectSku.selected,
                subselected:state.GoodsSelectSku.subselected,
                price:state.GoodsSelectSku.price,
                originalprice:_price,
                marketprice:_count,
                images:state.data.goods_images[0],
                sku:state.SelectedSku,
                stock:action.data[state.GoodsSelectSku.selected||0].addon.length ? action.data[state.GoodsSelectSku.selected||0].addon[state.GoodsSelectSku.subselected||0].stock : action.data[state.GoodsSelectSku.selected||0].stock,
                images:state.data.goods_images[0],
                data:action.data
            })
            _Array[0] = _tempObj
            return Object.assign({},state,{
                BuyList:_Array
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
                originalprice:state.BuyList[action.data.index].data[action.data.selected].goods_price
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case GODDS_BUY_SKU_SUB: // 购买商品的规格重新选择
            _Array = state.BuyList
            _Array[action.data.index] = Object.assign({},state.BuyList[action.data.index],{
                subselected:action.data.subselected,
                originalprice:state.BuyList[action.data.index].data[state.BuyList[action.data.index].selected].addon[action.data.subselected].goods_price
            })
            return Object.assign({},state,{
                BuyList:_Array
            })
            break;
        case ADD_BUY: // 增加同商品购买
            _Array = state.BuyList
            _Array.splice(action.index,0,_Array[action.index])
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