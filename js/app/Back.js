import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import FormElement from '../components/FormElement'
import handleForm from '../event/event.handleForm'
import CommitForm from '../event/event.CommitForm'
export default class Back extends Component{
    constructor(){
        super();
        this.state = {
            title:'退货原因',
            checked:0,
            type:1,
            url:config.url + '/orders/abandon',
            data:[
                '网购惯例，7天无理由退货退款。',
                '经过我多日研究，我还是比较抗拒，老板见谅。',
                '描述与实物有几个光年的距离，抱歉，退吧亲！',
                '产品很棒，但依旧无法满足我退掉的决心。'
            ],
            content:''
        }
    }
    componentDidMount() {
        document.title = this.state.title
        $.loading.hide();
    }
    componentWillUnmount() {
          
    }
    render(){
        let checked = this.state.checked;
        return (
            <div className="main" onChange={e=>this.handleForm(e)}>
                <FormElement data={this.state} />
                <span className="btn-add-address" onClick={e=>this.CommitForm(e)}>确认</span>
            </div>
        )
    }
}