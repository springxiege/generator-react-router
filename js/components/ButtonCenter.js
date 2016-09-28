import React,{Component} from 'react'
import {Link} from 'react-router'
export default class ButtonCenter extends Component{
    gotoUserCenter(){
        _hmt.push(['_trackEvent', 'UserCenterButton', 'click', '个人中心']);
    }
    render(){
        return (
            <div className="returntop btn-center"><Link to={`/UserCenter`} onClick={e=>this.gotoUserCenter(e)}></Link></div>
        )
    }
}