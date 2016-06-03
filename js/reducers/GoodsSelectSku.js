/**
 * 商品规格属性
 */
import { SHOW_HIDE_SELECT_SKU, GOODS_SELECT_SKU ,GOODS_SELECT_SKU_SUB ,INCREMENT,DECREMENT} from '../actions/ActionTypes'
const data = [
    {
      "id": 6,
      "goods_id": 1,
      "parent_id": 0,
      "feature_main": "38码",
      "feature_sub": "",
      "goods_price": "0.00",
      "stock": 0,
      "created_at": "2016-06-01 10:54:00",
      "updated_at": null,
      "deleted_at": null,
      "addon": [
        {
          "id": 7,
          "goods_id": 1,
          "parent_id": 6,
          "feature_main": "",
          "feature_sub": "红色",
          "goods_price": "300.00",
          "stock": 50,
          "created_at": "2016-06-01 10:54:20",
          "updated_at": null,
          "deleted_at": null
      },
          {
            "id": 8,
            "goods_id": 1,
            "parent_id": 6,
            "feature_main": "",
            "feature_sub": "蓝色",
            "goods_price": "320.00",
            "stock": 50,
            "created_at": "2016-06-01 10:54:20",
            "updated_at": null,
            "deleted_at": null
          }
      ]
  },

      {
        "id": 6,
        "goods_id": 1,
        "parent_id": 0,
        "feature_main": "39码",
        "feature_sub": "",
        "goods_price": "0.00",
        "stock": 0,
        "created_at": "2016-06-01 10:54:00",
        "updated_at": null,
        "deleted_at": null,
        "addon": [
          {
            "id": 7,
            "goods_id": 1,
            "parent_id": 6,
            "feature_main": "",
            "feature_sub": "黑色",
            "goods_price": "360.00",
            "stock": 50,
            "created_at": "2016-06-01 10:54:20",
            "updated_at": null,
            "deleted_at": null
        },
            {
              "id": 8,
              "goods_id": 1,
              "parent_id": 6,
              "feature_main": "",
              "feature_sub": "灰色",
              "goods_price": "420.00",
              "stock": 50,
              "created_at": "2016-06-01 10:54:20",
              "updated_at": null,
              "deleted_at": null
            },
                {
                  "id": 8,
                  "goods_id": 1,
                  "parent_id": 6,
                  "feature_main": "",
                  "feature_sub": "绿色",
                  "goods_price": "460.00",
                  "stock": 50,
                  "created_at": "2016-06-01 10:54:20",
                  "updated_at": null,
                  "deleted_at": null
                }
        ]
      }
]
let addon = {};
for(let i=0,l=data.length;i<l;i++){
    let item = data[i]
    if(item.addon.length){
        addon[i] = item.addon
    }else{
        addon[i] = []
    };
}
const initialState = {
    goods_addon:data,
    addon:addon,
    selected:0,
    subselected:0,
    count:1,
    originalprice:(data[0]['addon'].length ? data[0]['addon'][0]['goods_price'] : data[0]['goods_price']),
    price:(data[0]['addon'].length ? data[0]['addon'][0]['goods_price'] : data[0]['goods_price']),
    isvisible:0
}
export default function GoodsSelectSku(state = initialState,action){
    let _count = 0
    let _price = 0
    let _originalprice = 0
    switch (action.type) {
        case SHOW_HIDE_SELECT_SKU:
            return Object.assign({},state,{
                isvisible:!state.isvisible
            })
            break;
        case GOODS_SELECT_SKU:
            _originalprice = (data[parseInt(action.index)]['addon'].length ? data[parseInt(action.index)]['addon'][0]['goods_price'] : data[parseInt(action.index)]['goods_price'])
            return Object.assign({},state,{
                selected:parseInt(action.index),
                subselected:0,
                count:1,
                price:_originalprice,
                originalprice:_originalprice
            })
            break;
        case GOODS_SELECT_SKU_SUB:
            _originalprice = (data[state.selected]['addon'].length ? data[state.selected]['addon'][parseInt(action.index)]['goods_price'] : data[state.selected]['goods_price'])
            return Object.assign({},state,{
                subselected:parseInt(action.index),
                count:1,
                price:_originalprice,
                originalprice:_originalprice
            })
            break;
        case INCREMENT:
            _count = state.count-1
            _price = _count*state.originalprice
            return Object.assign({},state,{
                count:_count,
                price:_price
            })
            break;
        case DECREMENT:
            _count = state.count+1
            _price = _count*state.originalprice
            return Object.assign({},state,{
                count:_count,
                price:_price
            })
            break;
        default:
        return state;
            break;
    }
}
