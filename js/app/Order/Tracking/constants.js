import * as types from './action'
// 获取售后跟踪信息
export function getTracking(data){
    return {type:types.TRACKING,data}
}