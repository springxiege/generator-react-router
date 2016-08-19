/**
 * 图片公共组件
 * @author [xiege]
 * 实现功能：统一处理图片数组，获取正确的数据展示
 * 避免重复代码
 * 调用组件时，如果src传入的是数组，则直接返回图片不进行scrollLoading延迟加载
 * 如果src传入一个图片地址，则url必须传递图片数组并进行scrollLoading延迟加载
 */
import React,{Component} from 'react'
export default function CommonImage(props){
    let {src,url,...other} = props;
    if($.isArray(src)){
        return (
            <img src={src[0]||src[1]||src[2]} {...other} alt="" />
        )
    }else{
        return (
            <img src={src} data-url={url[0]||url[1]||url[2]} {...other} alt="" />
        )
    }
}
// import React,{Component} from 'react'
// export default class CommonImage extends Component{
//     componentDidMount(){
//         config.errorImage();
//     }
//     componentDidUpdate(){
//         config.errorImage();
//     }
//     render(){
//         let {src,url,...other} = this.props;
//         console.log(src)
//         if($.isArray(src)){
//             return (
//                 <img src={src[0]||src[1]||src[2]} {...other} alt="" />
//             )
//         }else{
//             return (
//                 <img src={src} data-url={url[0]||url[1]||url[2]} {...other} alt="" />
//             )
//         }
//     }
// }