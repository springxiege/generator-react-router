'use strict';
import React,{
    Component
} from 'react';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux'
import {
    getMessages
} from '../actions/ActionFuncs'
import ButtonCenter from '../components/ButtonCenter'
import LoadMorePageData from '../event/event.LoadMorePageData'
class Messages extends Component{
    constructor(){
        super();
        let _this = this;
        this.state = {
            operation:false,
            checkAll:false,
            data:[],
            url:config.url + '/message/officialinfo',
            page:2,
            flag:true,
            noMore:false,
            callback:function(pdata){
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMessages(newData));
                    }
                }else{
                    // 如果token失效
                }
            }
        };
        this.LoadMorePageData = LoadMorePageData.bind(this);
    }
    componentDidMount(){
        document.title = '我的消息'
        let _this = this;
        $.ajax({
            url: config.url + '/message/officialinfo',
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize:this.state.pagesize,
                page:1
            },
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                if(parseInt(data.code) === 0){
                    $.loading.hide();
                    if(data.data){
                        if(data.data.length){
                            let temp = [];
                            for (let i = 0; i < data.data.length; i++) {
                                let item = data.data[i];
                                temp[i] = {};
                                temp[i].id = item.id;
                                temp[i].checked = false;
                            };
                            _this.setState({
                                data:temp
                            })
                            _this.props.dispatch(getMessages(data.data));
                        }else{
                            $('#loading-more').hide();
                            $('.nolist').show();
                        }
                        if(data.last_page && parseInt(data.last_page) <= 1){
                            $('#loading-more').html('已全部加载')
                        }else{
                            window.addEventListener('scroll',_this.LoadMorePageData);
                        }
                    }else{
                        $('#loading-more').hide();
                    }
                }
            }
        });
        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.LoadMorePageData);
    }
    // 操作
    handleOperate(e){
        let data = this.state.data;
        let temp = [];
        if(!data.length){
            $.tips('无数据可操作');
            return false;
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            item.checked = false;
            temp.push(item);
        };
        this.setState({
            operation:!this.state.operation,
            checkAll:false,
            data:temp
        })
    }
    // 选择全部
    handleChangeAll(e){
        let data = this.state.data;
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            item.checked = !this.state.checkAll
            temp.push(item);
        }
        this.setState({
            checkAll:!this.state.checkAll,
            data:temp
        })
    }
    // 单个选择
    handleChange(e){
        let index = e.target.value;
        let data = this.state.data;
        let temp = [];
        let checkAll = false;
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if(index == i){
                item.checked = !item.checked
            };
            temp.push(item);
        };
        for (let i = 0; i < temp.length; i++) {
            let item = temp[i];
            if(!item.checked){
                checkAll = false;
                break;
            }else{
                checkAll = true;
            }
        }
        this.setState({
            checkAll:checkAll,
            data:temp
        })
    }
    // 删除
    handleDelete(e){
        let _this = this;
        let data = this.state.data;
        let temp = [];
        if(!data.length){
            $.tips('未选择删除项');
            return false;
        };
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if(item.checked){
                temp.push(item.id);
            };
        };
        if(!temp.length){
            $.tips('未选择删除项');
            return false;
        };
        $.confirm({
            content:'删除后不再显示',
            okBtn:function(){
                $.ajax({
                    url: config.url + '/message/deleteinfo',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        message_id:temp
                    },
                    beforeSend:(request)=>{
                        config.setRequestHeader(request);
                    },
                    error:(error)=>{
                        config.ProcessError(error);
                    },
                    success:(data)=>{
                        console.log(data);
                        let _data = _this.state.data;
                        if(parseInt(data.code) === 0){
                            let oldData = _this.props.state.data;
                            let newData = oldData;
                            for (let i = 0; i < temp.length; i++) {
                                let id = temp[i];
                                for (let i = 0; i < oldData.length; i++) {
                                    let item = oldData[i];
                                    if(id == item.id){
                                        newData.splice(i,1);
                                    }
                                }
                                for (let i = 0; i < _data.length; i++) {
                                    let item = _data[i];
                                    if(id == item.id){
                                        _data.splice(i,1);
                                    }
                                }
                            }
                            _this.setState({
                                data:_data
                            })
                            _this.props.dispatch(getMessages(newData));
                        }
                    }
                })
            }
        })
    }
    render(){
        return (
            <div className={this.state.operation?"main pdt80":"main pdt80 pdb0"}>
                {!this.props.state.data.length?"":(
                    <div className="msg-header">
                        <span className="fl" onClick={e=>this.handleOperate(e)}>
                            {this.state.operation?"取消":"编辑"}
                        </span>
                        {/* 选择操作后方显示否则不显示 */}
                        {this.state.operation?(
                            <label className={this.state.checkAll?"checkbox after checked fr":"checkbox after fr"}>
                                全选
                                <input type="checkbox" name="checkedAll" defaultValue="0" onChange={e=>this.handleChangeAll(e)} />
                            </label>
                        ):''}
                    </div>
                )}
                {/* delete类 状态 */}
                <div className={this.state.operation?"msg-content delete":"msg-content"} onChange={e=>this.handleChange(e)}>
                    {/* unread类 未读状态 */}
                    {!this.props.state.data.length?(
                        <p className="nolist" style={{display:'none'}} >暂无消息</p>
                    ):(
                        this.props.state.data.map((item,index)=>{
                            return (
                                <div className="msg-item unread" key={index}>
                                    <a href={item.content_url} className="bsb clearfix">
                                        <img src="http://s.51lianying.com/images/xds/trade/msg.png" alt="" className="fl" />
                                        <div className="msg-title">
                                            <p>{item.title}</p>
                                            <p>{item.send_department} {`${item.created_at.substring(11,item.created_at.length)}`}</p>
                                        </div>
                                    </a>
                                    <label className={this.state.data[index]&&this.state.data[index].checked?"checkbox checked after":"checkbox after"}>
                                        <input type="checkbox" name="msg" defaultValue={index} />
                                    </label>
                                </div>
                            )
                        })
                    )}
                    <p id="loading-more">列表加载中···</p>
                </div>
                {this.state.operation?(
                    <span className="btn-add-address" onClick={e=>this.handleDelete(e)}>删除</span>
                ):''}
                <ButtonCenter />
            </div>
        )
    }
}
function select(state){
    return {state:state.Messages};
}
export default connect(select)(Messages);