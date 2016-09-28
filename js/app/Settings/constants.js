import * as types from './action'
/**
 * 获取用户信息
 */
export function getUserInfo(data){
    return {type: types.GET_USER_INFO,data}
}
/**
 * 修改用户昵称
 */
export function ModifyNickName(name){
    return {type:types.MODIFY_NICKNAME,name}
}