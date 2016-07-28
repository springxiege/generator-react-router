/**
 * 我的收藏夹
 */
import React from 'react'
import {connect} from 'react-redux'
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import {
    getCollectList,
    CancelCollect
} from '../actions/ActionFuncs'
import CollectList from '../components/CollectList'
import CopyRight from '../components/CopyRight'
import ReturnTop from '../components/ReturnTop'
class MyCollect extends React.Component {
    componentDidMount(){
        document.title = '收藏列表'
        this.serverRequest = $.ajax({
            url: config.url + '/goods/collect',
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:(request)=>{
                if(config.head!=''){
                    request.setRequestHeader("token", config.head);
                }
            },
            success:(data)=>{
                $.loading.hide();
                if(parseInt(data.code) == 0){
                    this.props.dispatch(getCollectList(data.data))
                }
            }
        })
        
    }
    componentWillUnmount() {
        this.serverRequest.abort() 
    }
    render(){
        return (
            <div>
                <CollectList data={this.props.state} />
                <CopyRight />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    return {state:state.MyCollect};
}
export default connect(select)(MyCollect);
