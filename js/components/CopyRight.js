import React,{Component} from 'react';
export default class CopyRight extends Component{
    render(){
        return (
            <div className={`copyright ${this.props.clsName||''}`}>
                Copyright © 2016 我要联赢 51lianying.com 版权所有
            </div>
        )
    }
}
