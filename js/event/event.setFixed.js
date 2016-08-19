/**
 * [setFixed 设置商品详情、产品售后、评价悬浮]
 */
import {findDOMNode} from 'react-dom'
export default function setFixed(){
    let defaults = Object.assign({},{
        target:0
    },this.state)
    let scrollTop = $(window).scrollTop();
    if(scrollTop >= defaults.target){
        // this.setState({
        //     fixed:true
        // })
        $(findDOMNode(this.refs.ProductFixed)).addClass('fixed');
        $(findDOMNode(this.refs.productTabs)).addClass('pdt100');
    }else{
        // this.setState({
        //     fixed:false
        // })
        $(findDOMNode(this.refs.ProductFixed)).removeClass('fixed');
        $(findDOMNode(this.refs.productTabs)).removeClass('pdt100');
    }
}