/**
 * 评论列表
 */
import { GET_GOOD_COMMENT,GET_BAD_COMMENT } from '../actions/ActionTypes'
const initialState = {
    status:0,
    data:{
        0:[],
        1:[]
    }
}
let datas = [
     {
        "id": 4,
        "goods_id": 1,
        "buy_id": 1,
        "order_id": 1,
        "reply_id": 0,
        "comment_id": 1,
        "user_name":"凨亦凌",
        "user_image":"/images/3.jpg",
        "type": 1,
        "content": "阿萨德",
        "comment_start": 4,
        "ip": "",
        "created_at": "2016-06-01 11:06:31",
        "updated_at": "2016-06-01 11:06:42",
        "deleted_at": null
    },
    {
        "id": 6,
        "goods_id": 1,
        "buy_id": 1,
        "order_id": 2,
        "reply_id": 0,
        "comment_id": 0,
        "user_name":"凨亦凌",
        "user_image":"/images/3.jpg",
        "type": 1,
        "content": "哈哈",
        "comment_start": 5,
        "ip": "",
        "created_at": "2016-06-01 11:07:05",
        "updated_at": "2016-06-01 11:07:10",
        "deleted_at": null
    }
];
let _datas = [
    {
       "id": 8,
       "goods_id": 1,
       "buy_id": 1,
       "order_id": 1,
       "reply_id": 0,
       "comment_id": 1,
       "user_name":"凨亦凌",
       "user_image":"/images/3.jpg",
       "type": 1,
       "content": "阿萨德233",
       "comment_start": 4,
       "ip": "",
       "created_at": "2016-06-05 11:06:31",
       "updated_at": "2016-06-05 11:06:42",
       "deleted_at": null
   },
   {
       "id": 16,
       "goods_id": 1,
       "buy_id": 1,
       "order_id": 2,
       "reply_id": 0,
       "comment_id": 0,
       "user_name":"凨亦凌",
       "user_image":"/images/3.jpg",
       "type": 1,
       "content": "哈哈23333333",
       "comment_start": 2,
       "ip": "",
       "created_at": "2016-06-05 11:07:05",
       "updated_at": "2016-06-05 11:07:10",
       "deleted_at": null
   }
]
export default function CommentList ( state = initialState,action ){
    switch (action.type) {
        case GET_GOOD_COMMENT:
            return Object.assign({},state,{
                status:0,
                data:{
                    0:datas
                }
            })
            break;
        case GET_BAD_COMMENT:
            return Object.assign({},state,{
                status:1,
                data:{
                    1:_datas
                }
            })
            break;
        default:
            return Object.assign({},state,{
                status:0,
                data:{
                    0:datas
                }
            })
            break;
    }
}
