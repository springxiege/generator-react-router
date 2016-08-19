import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import FormElement from '../components/FormElement'
import handleForm from '../event/event.handleForm'
import CommitForm from '../event/event.CommitForm'
export default class RateOrder extends Component{
    constructor(){
        super();
        this.state = {
            title:'换货原因',
            type:2,
            url:config.url + '/orders/abandon',
            checked:0,
            data:[
                '换吧，换吧不是罪，我来付邮费。',
                '如果再给我一次机会，我还是选择换换换。',
                '描述失误啊，下次不能这样欺骗我邮费了。',
                '我收到是别人的宝宝，我现在要换回我的宝宝！',
            ],
            content:''
        }
        this.handleForm = handleForm.bind(this);
        this.CommitForm = CommitForm.bind(this);
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