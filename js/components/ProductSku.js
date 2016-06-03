/**
 * sku
 */
import '../../css/main-sku.css'
import React ,{Component,PropTypes} from 'react'
import ReactDOM,{findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {GoodsSelectedSku,ShowAndHideSelectSku} from '../actions/ActionFuncs'
class SKU extends Component{
    selectsku(){
        this.props.dispatch(ShowAndHideSelectSku())
        this.props.dispatch(GoodsSelectedSku(this.props.state.GoodsSelectSku))
    }
    render(){

        return (
            <div className="main-module">
                <div className="main-sku" onClick={e=>this.selectsku(e)}>
                    <p>{this.props.state.SelectedSku.sku}</p>
                    <span>&gt;</span>
                </div>
            </div>
        )
    }
}
function select (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
      state: state
    }
}
export default connect(select)(SKU);
