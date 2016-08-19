import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    gotoBuy,
    BuyCountIncrement,
    BuyCountDecrement,
    BuyIncrement,
    BuyDecrement,
    BuySelectSku,
    BuySelectSubSku
} from '../actions/ActionFuncs'
import CommonImage from '../components/CommonImage'
class BuyList extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        document.title = '选择规格';
        $.loading.show();
        if (store.enabled) {
            let OriginalBuyOrder = store.get('goods');
            if (OriginalBuyOrder === undefined) {
                alert('数据错误，请返回重新操作');
            } else {
                this.props.dispatch(gotoBuy(OriginalBuyOrder));
                let _data = this.props.state.BuyList;
                let _user = OriginalBuyOrder.get_users;
                store.set('BuyUser', _user);
                $.loading.hide();
            }
        } else {
            alert('This browser does not supports localStorage');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        config.errorImage()
    }

    componentWillUnmount() {

    }

    // 商品数量增加
    BuyCountAdd(e) {
        let _state = this.props.state.BuyList
        let _index = $(e.target).closest('.buy-item').index()
        let _data = _state[_index]
        let _stock = _data.stock
        let _count = _data.count
        if (_count < _stock) {
            this.props.dispatch(BuyCountIncrement(_index))
        }
    }

    // 减少商品数量
    BuyCountDel(e) {
        let _state = this.props.state.BuyList
        let _index = $(e.target).closest('.buy-item').index()
        let _data = _state[_index]
        let _stock = _data.stock
        let _count = _data.count
        if (_count > 1) {
            this.props.dispatch(BuyCountDecrement(_index))
        }
    }

    // 选择规格一
    setSelectSku(e) {
        let _index = $(e.target).closest('.buy-item').index()
        let $parent = $(e.target).closest('li')
        let _selected = $parent.index()
        let _checked = $parent.hasClass('cur')
        let _data = {index: _index, selected: _selected}
        if (_checked) {
            return false
        }
        let _list = this.props.state.BuyList;
        let _stock = _list[_index].goods_addon[_selected].addon[0].stock;
        let _addonLen = _list[_index].goods_addon[_selected].addon.length;
        let _feature_sub = _list[_index].goods_addon[_selected].addon[0].feature_sub;
        if (_addonLen === 1 && _feature_sub == '' && parseInt(_stock) === 0) {
            $.tips('库存为0，不可购买');
            return false;
        }
        this.props.dispatch(BuySelectSku(_data))
    }

    // 选择规格二
    setSelectSkuSub(e) {
        let _index = $(e.target).closest('.buy-item').index()
        let $parent = $(e.target).closest('li')
        let _selected = $parent.index()
        let _checked = $parent.hasClass('cur')
        let _data = {index: _index, subselected: _selected}
        if (_checked) {
            return false
        }
        let _list = this.props.state.BuyList;
        let _mainselect = _list[_index].selected;
        let _stock = _list[_index].goods_addon[_mainselect].addon[_selected].stock;
        if (parseInt(_stock) === 0) {
            $.tips('库存为0，不可购买');
            return false;
        }
        this.props.dispatch(BuySelectSubSku(_data))
    }

    // 同商品购买
    AddGoods(e) {
        let index = $(e.target).closest('.buy-item').index()
        this.props.dispatch(BuyIncrement(index))
    }

    // 删除同商品购买
    DelGoods(e) {
        let index = $(e.target).closest('.buy-item').index()
        this.props.dispatch(BuyDecrement(index))
    }

    Change(e) {

    }

    // 进入确认付款页面
    handleBilling(e) {
        let data = this.props.state.BuyList;
        let tmp = [];
        let jsonArray = [];
        let flag = true;
        let F_unique = function (item, field, count) {
            item.sort();
            for (let i = 1; i < item.length;) {
                if (field.map((key) => item[i - 1][key] == item[i][key])
                        .reduce((prv, next) => prv && next)) {
                    item[i - 1][count] += 1;
                    item.splice(i, 1);
                } else {
                    i++;
                }
            }
            return item;
        }
        let dealData = F_unique(data, ['selected', 'subselected'], 'count')
        for (let i = 0; i < dealData.length; i++) {
            let item = dealData[i]
            if(item.count>item.stock){
                flag = false;
                dealData[i].count = item.stock;
                break;
            }
        }
        if(!flag){
            $.confirm({
                content:'所选商品库存不足，数量将调至库存数',
                okBtn:function(){
                    config.setStorage('BuyOrderList', 'data', dealData)
                    window.location.hash = '#/Buy/buylist'
                }
            })
            return false;
        }
        config.setStorage('BuyOrderList', 'data', dealData)
        window.location.hash = '#/Buy/buylist'
    }

    render() {
        let _data = this.props.state.BuyList
        let curObject = {}
        let cur_date = []
        let _totalprice = 0
        // 计算价格
        // 购买商品列表
        let _goods = _data.map((item, index)=> {
            _totalprice += ((item.price - 0) * item.count + (item.fare - 0))
            // 规格一列表
            let sku = item.goods_addon.map((subitem, subindex)=> {
                let firstaddon = subitem.addon[0];
                if (subitem.addon.length === 1 && firstaddon.stock == 0) {
                    return (
                        <li className="disabled" key={subindex}>{subitem.feature_main}</li>
                    )
                }
                if (subitem.addon.length) {
                    return (
                        <li className={subindex == (item.selected||0) ? "cur" : ""} onClick={e=>this.setSelectSku(e)}
                            key={subindex}>{subitem.feature_main}</li>
                    )
                }
            })
            // 规格二列表
            let subskudata = item.goods_addon.length ? item.goods_addon[item.selected || 0].addon : []
            let subsku = ''
            if (subskudata.length && subskudata.length === 1 && subskudata[0].feature_sub === '') {
                subsku = ''
            } else {
                subsku = (
                    <div className="buy-sku-item clearfix">
                        <span className="fl">规&emsp;格</span>
                        <ul>
                            {subskudata.map((subskuitem, subskuindex)=> {
                                if (subskuitem.stock == 0) {
                                    return (
                                        <li className="disabled" key={subskuindex}>{subskuitem.feature_sub}</li>
                                    )
                                } else {
                                    return (
                                        <li className={subskuindex == item.subselected ? "cur" : ""} key={subskuindex}
                                            onClick={e=>this.setSelectSkuSub(e)}>{subskuitem.feature_sub}</li>
                                    )
                                }

                            })}
                        </ul>
                    </div>
                )
            }
            return (
                <div className="buy-item" key={index}>
                    <a href={item.goodsLink}>
                        <CommonImage src={item.images} className="fl"/>
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
                    </a>
                    <div className="buy-sku">

                        <div className="buy-sku-item clearfix">
                            <span className="fl">规&emsp;格</span>
                            <ul>
                                {sku}
                            </ul>
                        </div>
                        {subsku}
                        <div className="buy-sku-item clearfix">
                            <span className="fl">数&emsp;量</span>
                            <div className="buy-number clearfix">
                                <div className="number-wrapper fl">
                                    <span className={item.count<=1?"btn-add-count disabled fl":"btn-add-count fl"}
                                          onClick={e=>this.BuyCountDel(e)}></span>
                                    <input type="number" name="" value={item.count} readonly id="" className="fl"
                                           onChange={e=>this.Change(e)}/>
                                    <span
                                        className={item.count>=item.stock?"btn-minus-count disabled fl":"btn-minus-count fl"}
                                        onClick={e=>this.BuyCountAdd(e)}></span>
                                </div>
                                <i>件(库存{item.stock}件)</i>
                                {index != 0 ? (
                                    <span className="btn-del-buy fr" onClick={e=>this.DelGoods(e)}>删除</span>) : '' }

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
                        <p className="fr">合计：<span>{`${_totalprice.toFixed(2)}`}元</span></p>
                    </aside>
                    <a href="javascript:;" onClick={e=>this.handleBilling(e)}>确认</a>
                </footer>
            </div>
        )
    }
}
function select(state) {
    return {state: state.GoodsDetail};
}
export default connect(select)(BuyList);