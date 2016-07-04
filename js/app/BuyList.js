import "../../css/main-buylist.css";
import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    gotoBuy,
    Increment,
    Decrement
} from '../actions/ActionFuncs'
class BuyList extends Component{
    componentDidMount() {
        document.title = '购买页面'
        this.serverRequest = $.ajax({
            url: config.url + '/goods/addon/' + (this.props.params.buyId||'1'),
            type: 'GET',
            dataType: 'json',
            data: {},
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    this.props.dispatch(gotoBuy(data.data))
                }
            }
        })
         
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    Change(e){
        
    }
    AddGoods(e){
        alert('add')
        
    }
    MinusGoods(e){
        alert('minus')
        
    }
    render(){
        console.log(this.props.state)
        let _trade            = store.get('trade')
        let _state_BUY        = this.props.state.BuyList
        let _data             = _state_BUY.data
        let _select           = _state_BUY.selected
        let _subselect        = _state_BUY.subselected
        let _HTML             = ''
        let _SUB_LIST         = ''
        let _SUB_HTML         = ''
        let _BUY_LIST         = ''
        let _ADD_LIST         = ''
        let _LINK             = '/ProductDetails/'+this.props.params.buyId
        let subDate           = _data.length ? (_data[(_select||0)].addon || []) : []
        let BuyObject         = {}
        BuyObject.id          = this.props.params.buyId
        BuyObject.selected    = _select
        BuyObject.subselected = _subselect
        BuyObject.count       = _state_BUY.count
        if(_select!==null||_subselect!==null){
            config.setStorage && config.setStorage('trade','BuyObject',BuyObject);
        }else{
            BuyObject = store.get('trade').BuyObject
        }
        if(_data.length){
            _HTML = _data.map((item,index)=>{
                return (
                    <li className={index == BuyObject.selected ? "cur" : ""} key={index}>{item.feature_main}</li>
                )
            })
        }
        if(subDate && subDate.length){
            _SUB_LIST = subDate.map((item,index)=>{
                return (
                    <li className={index == BuyObject.subselected ? "cur" : ""} key={index}>{item.feature_sub}</li>
                )
            })
            _SUB_HTML = (
                <div className="buy-sku-item clearfix">
                    <span className="fl">规格二</span>
                    <ul>
                        {_SUB_LIST}
                    </ul>
                </div>
            )
        }
        _BUY_LIST = (
            <div className="buy-item">
                <Link to={_LINK}>
                    <img src={_state_BUY.images} alt="" className="fl" />
                    <div className="buy-info">
                        <h2>{_state_BUY.title}</h2>
                        <p className="buy-summary">{} <span className="fr">&times;{BuyObject.count}</span></p>
                        <p className="buy-price">&yen;{_state_BUY.originalprice} <s>&yen;{_state_BUY.marketprice}</s><span className="fr">快递：{_state_BUY.fare}元</span></p>
                    </div>
                </Link>
                <div className="buy-sku">
                    <div className="buy-sku-item clearfix">
                        <span className="fl">规格一</span>
                        <ul>
                            {_HTML}
                        </ul>
                    </div>
                    {_SUB_HTML}
                    <div className="buy-sku-item clearfix">
                        <span className="fl">数&emsp;量</span>
                        <div className="buy-number clearfix">
                            <div className="number-wrapper fl">
                                <span className="btn-add-count fl" onClick={e=>this.MinusGoods(e)}></span>
                                <input type="number" name="" value={BuyObject.count} readonly id="" className="fl" onChange={e=>this.Change(e)} />
                                <span className="btn-minus-count fl" onClick={e=>this.AddGoods(e)}></span>
                            </div>
                            <i>件(库存1005件)</i>
                            <span className="btn-del-buy fr">删除</span>
                            <span className="btn-add-buy fr">添加</span>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="main">
                <div className="buy">
                    {_BUY_LIST}
                </div>
                <footer className="cart-footer buy-footer clearfix">
                    <aside className="fl">
                        <p className="fr">合计：<span>2097.00元</span></p>
                    </aside>
                    <Link to="#">确认</Link>
                </footer>
            </div>
        )
    }
}
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(BuyList);