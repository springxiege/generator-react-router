/**
 * 全部宝贝
 */
import '../../css/main-allgoods.css'
import React,{Component} from 'react'
import {
    Link
} from 'react-router'
import {connect} from 'react-redux'
import Recommend from '../components/Recommend'
import CopyRight from '../components/CopyRight'
import { getGoodsList } from '../actions/ActionFuncs'
class AllGoods extends Component {
    componentDidMount() {
        document.title = '全部宝贝'
        let _id = this.props.params.userId||'1';
        this.serverRequest = $.ajax({
            url: config.url + '/goods/list/' + _id,
            type: 'GET',
            dataType: 'json',
            data: {},
            beforeSend:()=>{
                $.loading.show()
            },
            error:(error)=>{
                console.error(error);
                alert('网络错误，页面将刷新重试！');
                window.location.reload();
            },
            success:(data)=>{
                if(parseInt(data.code) == 0){
                    this.props.dispatch(getGoodsList(data.data))
                    $.loading.hide()
                }else{
                    alert('网络错误，页面将刷新重试！');
                    window.location.reload();
                }
            }
        });
        
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render(){
        let _data = this.props.state
        let _HTML = ''
        if(_data.data.length){
            _HTML = _data.data.map((item,index)=>{
                let _link = '/ProductDetails/'+item.id
                return (
                    <li key={index}>
                        <Link className="gllgoods-item" to={_link}>
                            <img src={item.goods_images[0]} alt="" />
                            <p>{item.title}</p>
                            <p>&yen;{item.min_price}~{item.max_price}</p>
                        </Link>
                    </li>
                )
            })
        }else{
            _HTML = (
                <div className="allgoods_nolist">暂时还没有商品</div>
            )
        }
        return (
            <div className="main">
                <div className="allgoods-header clearfix">
                    <img src="images/3.jpg" alt="" className="fl" />
                    <p className="fl">王小二的时尚卖手</p>
                    <div className="goods-count fr">本家有<span>{_data.data.length}</span>个宝贝</div>
                </div>
                <div className="allgoods-container">
                    <div className="allgoods-list">
                        <ul className="clearfix">
                            {_HTML}
                        </ul>
                    </div>
                </div>
                <Recommend />
                <CopyRight />
            </div>
        )
    }
}
function select(state){
    return {state:state.GoodsList};
}
export default connect(select)(AllGoods);