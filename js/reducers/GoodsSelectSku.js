/**
 * 商品规格属性
 */
import { GOODS_SELECT_SKU ,GOODS_SELECT_SKU_SUB ,INCREMENT,DECREMENT} from '../actions/ActionTypes'
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
          "goods_price": "500.00",
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
            "goods_price": "500.00",
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
            "goods_price": "500.00",
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
              "goods_price": "500.00",
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
                  "goods_price": "500.00",
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
    count:1
}
export default function GoodsSelectSku(state = initialState,action){
    switch (action.type) {
        case GOODS_SELECT_SKU:
            return Object.assign({},state,{
                selected:action.index
            })
            break;
        case GOODS_SELECT_SKU_SUB:
            return Object.assign({},state,{
                subselected:action.index
            })
            break;
        case INCREMENT:
            return Object.assign({},state,{
                
            })
            break;
        case DECREMENT:

            break;
        default:
        return state;
            break;
    }
}
