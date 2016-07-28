import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
export default class ReturnTop extends Component{
    constructor(){
        super();
        this.state = {
            winHeight: $(window).height(),
            bodyHeight: $('body').height(),
        };
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleBack)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleBack)
    }
    handleBack(){
        let scrollTop = $(window).scrollTop();
        if(scrollTop > 200){
            $(findDOMNode(this.refs.Back)).show()
        }else{
            $(findDOMNode(this.refs.Back)).hide()
        }
    }
    GotoTop(e){
        $('body').animate({
            scrollTop:0
        }, 800)
    }
    render(){
        return (
            <div className="returntop" ref='Back' onClick={e=>this.GotoTop(e)}></div>
        )
    }
}
