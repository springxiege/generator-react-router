import {
    ORDER_DETAIL
} from '../actions/ActionTypes'
const initialState = {
    data:{
        "id": 28,
        "goods_id": 1,
        "user_id": 441,
        "buy_id": 1,
        "out_trade_no": "046287c607f5f9aaba447a677c2496",
        "common_out_trade_no": "PutXBVPutXBV11607111631091",
        "purchaser": "张三",
        "purchaser_phone": "15990154792",
        "purchaser_address": "西湖区计量大厦611",
        "parcel_status": 1,
        "parcel_num": null,
        "status": 2,
        "is_abandon": 0,
        "goods_postage": "5.00",
        "total_number": 1,
        "total_amount": "220.00",
        "preferential": "225.00",
        "goods_price": "220.00",
        "deduct_fee": "0.00",
        "addon_id": 0,
        "feature_main": "灰色",
        "feature_sub": "",
        "type": 1,
        "trade_no": "",
        "ip": "",
        "is_auto_confirm": 0,
        "buy_at": null,
        "parcel_sending_at": null,
        "parcel_confirm_at": null,
        "abandon_at": null,
        "created_at": "2016-07-11 16:31:09",
        "updated_at": "2016-07-19 14:29:47",
        "deleted_at": null,
        "goods":{goods_images:[]},
        "shop":{}
    }
}
export default function OrderDetail(state=initialState,action){
    switch (action.type){
        case ORDER_DETAIL:
            return Object.assign({},state,{
                data:action.data
            });
            break;
        default:
            return state;
            break;
    }
}