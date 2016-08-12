import React,{Component} from 'react';
import { Link } from 'react-router'
import CommonImage from './CommonImage'
export default class BrowseHistory extends Component{
    render(){
        let data = this.props.browsehistory
        let _HTML = (<p className="nolist">暂无浏览足迹</p>)
        if(data != undefined && data.length){
            _HTML = data.map((item,index)=>{
                return (
                    <li key={index}>
                        <Link to={`/ProductDetails/${item.id}`}>
                            <div className="his-imgs">
                                <CommonImage src={item.goods_images} />
                            </div>
                            <p>{item.title}</p>
                            <p>&yen;{item.min_price}</p>
                        </Link>
                    </li>
                )
            })   
        }
        return (
            <div className="main-history">
                <h2>浏览足迹</h2>
                <ul className="clearfix">
                    {_HTML}
                </ul>
            </div>
        )
    }
}