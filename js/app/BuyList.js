import React,{Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {
    gotoBuy,
    BuyCountIncrement,
    BuyCountDecrement,
    BuyIncrement,
    BuyDecrement,
    BuySelectSku,
    BuySelectSubSku,
    GENERATE_TEMP_BUYLIST,
    updateBuyList
} from '../actions/ActionFuncs'
class BuyList extends Component{
    componentDidMount() {
        document.title = '确认购买'
        if(store.get('BuyList') === undefined){
            this.serverRequest = $.ajax({
                url: config.url + '/goods/addon/' + (this.props.params.buyId||'1'),
                type: 'GET',
                dataType: 'json',
                data: {},
                beforeSend:(request)=>{
                    $.loading.show();
                    if(config.head!=''){
                        request.setRequestHeader("Authorization", "Bearer " + config.head);
                    }
                },
                error:(error)=>{
                    console.error(error)
                },
                success:(data)=>{
                    if(parseInt(data.code) == 0){
                        this.props.dispatch(gotoBuy(data.data));
                        $.loading.hide();
                        let _data = this.props.state.BuyList;
                        let _user = this.props.state.data.get_users
                        store.set('BuyList',_data);
                        store.set('BuyUser',_user);
                    }
                }
            })
        }else{
            // console.log(store.get('BuyList'))
            this.props.dispatch(updateBuyList(store.get('BuyList')))
            $.loading.hide();
        }
    }
    componentWillUnmount() {
        // alert('确定要离开吗？')
        this.serverRequest && this.serverRequest.abort();
        // store.remove('BuyList');
    }
    // 商品数量增加
    BuyCountAdd(e){
        let _state = this.props.state.BuyList
        let _index = $(e.target).closest('.buy-item').index()
        let _data = _state[_index]
        let _stock = _data.stock
        let _count = _data.count
        if(_count < _stock){
            this.props.dispatch(BuyCountIncrement(_index))
        }
    }
    // 减少商品数量
    BuyCountDel(e){
        let _state = this.props.state.BuyList
        let _index = $(e.target).closest('.buy-item').index()
        let _data = _state[_index]
        let _stock = _data.stock
        let _count = _data.count
        if(_count > 1){
            this.props.dispatch(BuyCountDecrement(_index))
        }
    }
    // 选择规格一
    setSelectSku(e){
        let _index    = $(e.target).closest('.buy-item').index()
        let $parent   = $(e.target).closest('li')
        let _selected = $parent.index()
        let _checked  = $parent.hasClass('cur')
        let _data     = {index:_index,selected:_selected}
        if(_checked){ return false }
        this.props.dispatch(BuySelectSku(_data))
    }
    // 选择规格二
    setSelectSkuSub(e){
        let _index    = $(e.target).closest('.buy-item').index()
        let $parent   = $(e.target).closest('li')
        let _selected = $parent.index()
        let _checked  = $parent.hasClass('cur')
        let _data     = {index:_index,subselected:_selected}
        if(_checked){ return false }
        this.props.dispatch(BuySelectSubSku(_data))
    }
    // 同商品购买
    AddGoods(e){
        let index = $(e.target).closest('.buy-item').index()
        this.props.dispatch(BuyIncrement(index))
    }
    // 删除同商品购买
    DelGoods(e){
        let index = $(e.target).closest('.buy-item').index()
        this.props.dispatch(BuyDecrement(index))
    }
    Change(e){
        
    }
    // 进入确认付款页面
    handleBilling(e){
        config.setStorage('BuyOrderList','data',this.props.state.BuyList)
        window.location.hash = '#/Buy/buylist'
    }
    render(){
        // console.log(this.props.state)
        let _data = this.props.state.BuyList
        let _link = '/ProductDetails/'+this.props.params.buyId
        let curObject = {}
        let cur_date = []
        let _totalprice = 0
        // 计算价格
        // 购买商品列表
        let _goods = _data.map((item,index)=>{
            _totalprice += ((item.price-0)*item.count+(item.fare-0))
            // 规格一列表
            let sku = item.data.map((subitem,subindex)=>{
                return (
                    <li className={subindex == (item.selected||0) ? "cur" : ""} key={subindex} onClick={e=>this.setSelectSku(e)} >{subitem.feature_main}</li>
                )
            })
            // 规格二列表
            let subskudata = item.data.length?item.data[item.selected||0].addon:[]
            let subsku = ''
            if(subskudata.length && subskudata.length ===1 && subskudata[0].feature_sub===''){
                
            }else{
                subsku = (
                    <div className="buy-sku-item clearfix">
                        <span className="fl">规格二</span>
                        <ul>
                            {subskudata.map((subskuitem,subskuindex)=>{
                                return (
                                    <li className={subskuindex == item.subselected ? "cur" : ""} key={subskuindex} onClick={e=>this.setSelectSkuSub(e)} >{subskuitem.feature_sub}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            }
            return (
                <div className="buy-item" key={index}>
                    <Link to={_link}>
                        <img src={item.images} alt="" className="fl" />
                        <div className="buy-info">
                            <h2>{item.title}</h2>
                            <p className="buy-summary">
                                {item.sku}
                                <span className="fr">&times;{item.count}</span>
                            </p>
                            <p className="buy-price">
                                &yen;{item.price} 
                                <s>&yen;{item.originalprice}</s>
                                <span className="fr">快递：{item.fare}元</span>
                            </p>
                        </div>
                    </Link>
                    <div className="buy-sku">
                        <div className="buy-sku-item clearfix">
                            <span className="fl">规格一</span>
                            <ul>
                                {sku}
                            </ul>
                        </div>
                        {subsku}
                        <div className="buy-sku-item clearfix">
                            <span className="fl">数&emsp;量</span>
                            <div className="buy-number clearfix">
                                <div className="number-wrapper fl">
                                    <span className="btn-add-count fl" onClick={e=>this.BuyCountDel(e)}></span>
                                    <input type="number" name="" value={item.count} readonly id="" className="fl" onChange={e=>this.Change(e)} />
                                    <span className="btn-minus-count fl" onClick={e=>this.BuyCountAdd(e)}></span>
                                </div>
                                <i>件(库存{item.stock}件)</i>
                                {index!=0 ? (<span className="btn-del-buy fr" onClick={e=>this.DelGoods(e)}>删除</span>): '' }
                                
                                <span className="btn-add-buy fr" onClick={e=>this.AddGoods(e)}>添加</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) 
        return (
            <div className="main">
                <div className="buy">
                    {_goods}
                </div>
                <footer className="cart-footer buy-footer clearfix">
                    <aside className="fl">
                        <p className="fr">合计：<span>{_totalprice}元</span></p>
                    </aside>
                    <a href="javascript:;" onClick={e=>this.handleBilling(e)}>确认</a>
                    {/*<Link to="/Buy/buylist">确认</Link>*/}
                </footer>
            </div>
        )
    }
}
function select(state){
    return {state:state.GoodsDetail};
}
export default connect(select)(BuyList);