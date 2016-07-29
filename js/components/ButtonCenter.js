import React,{Component} from 'react'
import {Link} from 'react-router'
export default class ButtonCenter extends Component{
    render(){
        return (
            <div className="returntop btn-center"><Link to={`/UserCenter`}></Link></div>
        )
    }
}