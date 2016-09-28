import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
// import FormElement from '../components/FormElement'
import handleForm from '../event/event.handleForm'
import CommitForm from '../event/event.CommitForm'
export default class ReturnsReason extends Component{
    constructor(){
        super();
        this.state = {
            disabled:false,
            checked:0,
            title:'退换货原因',
            url:config.url + '/orders/abandon',
            data:[
                '网购惯例，7天无理由退货退款',
                '经过我多日研究，我还是比较抗拒，老板见谅',
                '描述与实物有几个光年的距离，抱歉，退吧亲',
                '产品很棒，但依旧无法满足我退掉的决心'
            ]
        };
        this.handleForm = handleForm.bind(this);
        this.CommitForm = CommitForm.bind(this);
    }
    componentDidMount() {
        let type = this.props.params.type;
        switch(type){
            case 'UnfilledOrder':
                this.setState({
                    type:1,
                    title: '退款原因',
                    data:[
                        '我想我是冲动，请协助我痛快的退款吧',
                        '收件地址填写错误，请及时退款，我好更改',
                        '实在找不到理由，就是想退款而已',
                        '老板，发货超时啦！不要！得人心者得天下'
                    ]
                });
                break;
            case 'ReceiptOrder':
                this.setState({
                    type:1,
                    title: '退货原因',
                    data:[
                        '网购惯例，7天无理由退货退款。',
                        '经过我多日研究，我还是比较抗拒，老板见谅',
                        '描述与实物有几个光年的距离，抱歉，退吧亲',
                        '产品很棒，但依旧无法满足我退掉的决心'
                    ]
                });
                break;
            case 'ReturnOrder':
                this.setState({
                    type:2,
                    title: '换货原因',
                    data:[
                        '换吧，换吧不是罪，我来付邮费',
                        '如果再给我一次机会，我还是选择换换换',
                        '描述失误啊，下次不能这样欺骗我邮费了',
                        '我收到是别人的宝宝，我现在要换回我的宝宝'
                    ],
                    content:''
                })
                break;
            default:
                break;
        }
        document.title = this.state.title;
        $.loading.hide();
    }
    componentDidUpdate(prevProps, prevState) {
        document.title = this.state.title  
    }
    componentWillUnmount() {
        
    }
    render(){
        let checked = this.state.checked;
        return (
            <div className="main">
                {/*<FormElement data={this.state} />*/}
                <form className="return-money" onChange={e=>this.handleForm(e)}>
                    <h2 className="address-title">{this.state.title}</h2>
                    {this.state.data.length?this.state.data.map((item,index)=>{
                        return (
                            <label className={checked == index ? "checked" : ""} key={index}>
                                <input type="radio" name="abandon_reason" defaultValue={index} />{item}
                            </label>
                        )
                    }):""}
                    {this.state.content!=undefined?(
                        <div>
                            <textarea name="content" placeholder="给卖家留言" defaultValue={this.state.content} ></textarea>
                            <p>还可以输入<span>{50 - this.state.content.length}</span>个字符</p>
                        </div>
                    ):""}
                </form>
                <span className={this.state.disabled?"btn-add-address disabled":"btn-add-address"} onClick={e=>this.CommitForm(e)}>{this.state.disabled?"确认中···":"确认"}</span>
            </div>
        )
    }
}