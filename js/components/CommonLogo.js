/**
 * LOGO图片公共组件
 * @author [xiege]
 * 实现功能：统一处理LOGO图片，获取正确的数据展示
 * 避免重复代码
 */
import React,{Component} from 'react'
export default function CommonLogo(props){
    let {src,...other} = props
    return (
        <img src={src||'http://s.51lianying.com/images/xds/trade/logo.jpg'} {...other} alt="" />
    )
}