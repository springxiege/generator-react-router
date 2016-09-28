/**
 * sku
 */
import React ,{Component,PropTypes} from 'react'
import ReactDOM,{findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {GoodsSelectedSku,ShowAndHideSelectSku} from '../actions/ActionFuncs'
class SKU extends Component{
    selectsku(){
        _hmt.push(['_trackEvent', 'sku', 'click', '选择规格属性']);
        this.props.dispatch(ShowAndHideSelectSku())
    }
    render(){
        return (
            <div className="main-module">
                <div className="main-sku" onClick={e=>this.selectsku(e)}>
                    <p>{this.props.state.SelectedSku}</p>
                    <span></span>
                </div>
            </div>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state.GoodsDetail
    }
}
export default connect(select)(SKU);
