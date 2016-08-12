/**
 * 图片公共组件
 * @author [xiege]
 * 实现功能：统一处理图片数组，获取正确的数据展示
 * 避免重复代码
 */
import React,{Component} from 'react'
export default class CommonImage extends Component{
    render(){
        let {src,...other} = this.props
        return (
            <img src={src[0]||src[1]||src[2]} {...other} alt="" />
        )
    }
}