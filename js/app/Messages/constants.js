import * as types from './action'
/**
 * 获取消息中心数据
 */
export function getMessages(data){
    return {type:types.MESSAGES,data}
}