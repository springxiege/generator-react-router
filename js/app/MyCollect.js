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
import CollectList from '../components/CollectList'
import CopyRight from '../components/CopyRight'
import ReturnTop from '../components/ReturnTop'
class MyCollect extends React.Component {
    render(){
        return (
            <div>
                <CollectList />
                <CopyRight />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    console.log(state)
    return {state:state};
}
export default connect(select)(MyCollect);
