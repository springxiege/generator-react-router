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
    id:ProductDate.id,
    data:[commentDate,commentDate]
}
const GoodsSelectSku = {
    count:1,
    isvisible:false,
    selected:null,
    subselected:null,
    price:0,
    originalprice:0
}
const SelectedSku = {
    sku:"选择：规格分类"
}

const initialState = {
    Collect:Collect,
    CommentList:CommentList,
    GoodsSelectSku:GoodsSelectSku,
    SelectedSku:SelectedSku,
    activity_ids:[],
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
        "goods_addon": [
          {
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
          }
        ]
      }
}

export default function GoodsDetail(state=initialState,action){
    let _originalprice = 0
    let _count         = 1
    let _price         = 0
    let _skuObj        = {}
    let _sku           = ''
    switch (action.type) {
        case GOODS_DETAIL:
            return Object.assign({},state,action.data)
            break;
        case GOODS_SELECT_SKU: //选择规格一
            state.GoodsSelectSku.selected = action.index
            return Object.assign({},state)
            break;
        case GOODS_SELECT_SKU_SUB: // 选择规格二
            state.GoodsSelectSku.subselected = action.index
            return Object.assign({},state)
            break;
        case GOODS_SELECTED_SKU: // 显示已选择规格
            _skuObj = state.data.goods_addon[(GoodsSelectSku.selected||0)]
            _sku = _skuObj.feature_main + " " + (_skuObj['addon']&&_skuObj['addon'].length&&_skuObj['addon'][(GoodsSelectSku.subselected||0)].feature_sub||'')
            state.SelectedSku.sku = _sku
            return Object.assign({},state)
            break;
        case SHOW_HIDE_SELECT_SKU: // 选择属性规格层的显示与隐藏
            state.GoodsSelectSku.isvisible = !state.GoodsSelectSku.isvisible
            return Object.assign({},state)
            break;
        case ADD_COLLECT: // 添加收藏
            
            return Object.assign({},state,{
                
            })
            break;
        case CANCEL_COLLECT: // 取消收藏
            
            return Object.assign({},state,{
                
            })
            break;
        case REFRESHRECOMMEND: // 刷新51推荐列表
            return Object.assign({},state,{
                
            })
            break;
        case INCREMENT: // 添加商品数量
            
            return Object.assign({},state,{
                
            })
            break;
        case DECREMENT: // 减少商品数量
            
            return Object.assign({},state,{
                
            })
            break;
        case GET_GOOD_COMMENT: // 获取好评列表
            
            return Object.assign({},state,{
                
            })
            break;
        case GET_BAD_COMMENT: // 获取差评列表
            
            return Object.assign({},state,{
                
            })
            break;
        default:
            return state;
            break;
    }
}
