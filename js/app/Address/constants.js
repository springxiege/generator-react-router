import * as types from './action'
/**
 * 地址库 [初始化数据]
 */
export function Address(data){
    return {type:types.ADDRESS,data}
}
/**
 * 添加地址
 */
export function AddressAdd(data){
    return {type:types.ADDRESS_ADD,data}
}
/**
 * 编辑地址
 */
export function EditAddress(data){
    return {type:types.ADDRESS_EDIT,data}
}
/**
 * 删除地址
 */
export function AddressDelete(data){
    return {type:types.ADDRESS_DELETE,data}
}
/**
 * 选择地址
 */
export function AddressSelect(data){
    return {type:types.ADDRESS_SELECT,data}
}
/**
 * 设为默认地址
 */
export function AddressDefault(data){
    return {type:types.ADDRESS_DEFAULT,data}
}
/**
 * 删除后更新数据
 */
export function AddressDeleteUpdate(data){
    return {type:types.ADDRESS_DELETE_UPDATE,data}
}
/**
 * 
 */
export function AddressEditDefault(data){
    return {type:types.ADDRESS_EDIT_DEFAULT,data}
}