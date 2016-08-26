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
        <img src={src||'http://s.51lianying.com/images/xds/trade/shop_logo.gif'} {...other} alt="" />
    )
}
// export default class CommonLogo extends Component{
//     render(){
//         let {src,...other} = this.props
//         return (
//             <img src={src||'/images/shop_logo.gif'} {...other} alt="" />
//         )
//     }
// }