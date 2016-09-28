import * as types from './action'
/**
 * 个人中心数据
 */
export function getUserCenterInfo(data){
    return {type: types.GET_USER_CENTER_INFO,data}
}