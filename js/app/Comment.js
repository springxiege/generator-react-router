import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
export default class Comment extends Component{
    componentDidMount(){
        document.title = '评价'
        $.loading.hide();
    }
    componentWillUnmount() {
          
    }
    // 提交评论
    handleSendComment(e){
        let $form = $(findDOMNode(this.refs.comment))
        let _content = $form.find('[name=content]').val()
        let _stars = $form.find(':radio[name=star]:checked').val()||-1
        let _complex = $form.find(':radio[name=complex]:checked').val()||0
        if(_content == ''){
            $.error('评论内容不能为空')
            $form.find('[name=content]').focusin()
            return false;
        }
        if(_stars < 0){
            $.error('请选择商品满意度')
            return false;
        }else{
            _stars = (_stars - 0) + (1 - 0)
        }
        $.ajax({
            url: config.url + '/orders/comment/' + this.props.params.orderId,
            type: 'POST',
            dataType: 'json',
            data: {
                satisfaction_star:_stars,
                satisfaction_summary:_complex,
                content:_content
            },
            beforeSend:(request)=>{
                if(config.head!=''){
                    request.setRequestHeader("token", config.head);
                }
            },
            error:(error)=>{
                console.error(error)
            },
            success:(data)=>{
                console.log(data)
                if(parseInt(data.code) === 0){
                    $.error(data.data.msg,1500,function(){
                        window.location.hash = '#/RateOrder'
                    })
                }
            }
        })
        
    }
    // 获取内容进行计数
    handleCount(e){
        let _content =e.target.value
        if(_content.length > 50){
            e.target.value = _content.substring(0,50);
        }
        $('#count').html((50-_content.length)<=0?0:(50-_content.length)) 
    }
    // 评星
    handleGetStars(e){
        let index = (e.target.value-0) + (1-0)
        $(e.target).closest('div').find('label').removeClass('cur').slice(0,index).addClass('cur');
    }
    // 综合满意度
    handleComplex(e){
        let _value = e.target.value
        $(e.target).closest('label').addClass('cur').siblings('label').removeClass('cur');
    }
    render(){
        return (
            <div className="main">
                <form className="rate" ref="comment">
                    <textarea name="content" id="" placeholder="您对宝贝的评价很重要，我们决不妥协任何一次瑕疵。(非必填，默认填写为：宝贝不错，无须评价。)" onChange={this.handleCount}></textarea>
                    <p>还可以输入<span id="count">50</span>个字符</p>
                    <div className="rate-star clearfix">
                        <span className="fl">商品满意度</span>
                        <div>
                            <label className="star"><input type="radio" name="star" defaultValue="0" onChange={e=>this.handleGetStars(e)} /></label>
                            <label className="star"><input type="radio" name="star" defaultValue="1" onChange={e=>this.handleGetStars(e)} /></label>
                            <label className="star"><input type="radio" name="star" defaultValue="2" onChange={e=>this.handleGetStars(e)} /></label>
                            <label className="star"><input type="radio" name="star" defaultValue="3" onChange={e=>this.handleGetStars(e)} /></label>
                            <label className="star"><input type="radio" name="star" defaultValue="4" onChange={e=>this.handleGetStars(e)} /></label>
                        </div>
                    </div>
                    <div className="rate-ctrl clearfix">
                        <span className="fl">综合满意度</span>
                        <div>
                            <label><input type="radio" name="complex" defaultValue="1" onChange={e=>this.handleComplex(e)} />好评</label>
                            <label><input type="radio" name="complex" defaultValue="2" onChange={e=>this.handleComplex(e)} />差评</label>
                        </div>
                    </div>
                </form>
                <footer className="cart-footer rate-footer clearfix">
                    <aside className="fl"><Link to="/UserCenter">下次评价</Link></aside>
                    <a href="javascript:;" onClick={e=>this.handleSendComment(e)}>提交评价</a>
                </footer>
            </div>
            
        )
    }
}