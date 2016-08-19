import React,{Component} from 'react';
import { Link } from 'react-router'
import CommonLogo from './CommonLogo'
export default class BrowseHistory extends Component{
    render(){
        let data = this.props.browsehistory
        let _HTML = (<p className="nolist">暂无浏览足迹</p>)
        if(data != undefined && data.length){
            _HTML = data.map((item,index)=>{
                return (
                    <li key={index}>
                        <a href={item.link}>
                            <div className="his-imgs">
                                <CommonLogo src={item.logo} />
                            </div>
                            {/*<p>{item.title}</p>*/}
                            
                            <p>&yen;{item.price}</p>
                        </a>
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