import React,{Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
export default class Comment extends Component{
    constructor(){
        super();
        this.state = {
            star:[1,1,1,1,1],
            slen:4,
            complex:2,
            disabled:false
        }
    }
    componentDidMount(){
        document.title = '评价'
        $.loading.hide();
    }
    componentWillUnmount() {
          
    }
    // 提交评论
    handleSendComment(e){
        let $form = $(findDOMNode(this.refs.comment));
        let _content = $form.find('[name=content]').val();
        let _stars = this.state.slen;
        let _complex = this.state.complex;
        let _params = {};
        if(_content == ''){
            $.tips('评论内容不能为空')
            $form.find('[name=content]').focusin()
            return false;
        }
        if(_stars < 0){
            $.tips('请选择商品满意度')
            return false;
        }else{
            _stars = (_stars - 0) + (1 - 0)
        }
        _params.satisfaction_star = this.props.params.Review ? 0 : _stars;
        _params.satisfaction_summary = this.props.params.Review ? 0 : _complex;
        _params.content = _content;
        if(!this.state.disabled){
            this.setState({
                disabled:true
            })
            $.ajax({
                url: config.url + '/orders/comment/' + this.props.params.orderId,
                type: 'POST',
                dataType: 'json',
                data: _params,
                beforeSend:(request)=>{
                    config.setRequestHeader(request);
                },
                error:(error)=>{
                    config.ProcessError(error);
                },
                success:(data)=>{
                    // console.log(data)
                    this.setState({
                        disabled:false
                    })
                    if(parseInt(data.code) === 0){
                        $.tips(data.data.msg,1500,function(){
                            window.location.hash = '#/RateOrder'
                        })
                    }
                    if(parseInt(data.code) === 1){
                        $.tips(data.data.msg,1200,function(){
                            window.location.hash = '#/RateOrder'
                        })
                    }
                }
            })
        }

        
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
    handleGetStars(e,id){
        let index = (e.target.value-0) + (1-0)
        let array = this.state.star
        let tem = []
        for (let i = 0; i < array.length; i++) {
            let item = array[i]
            if(i<=id){
                tem.push(1)
            }else{
                tem.push(0)
            }
        }
        this.setState({
            star:tem,
            slen:id
        })
    }
    // 综合满意度
    handleComplex(e,id){
        this.setState({
            complex:id
        })
    }
    render(){
        return (
            <div className="main">
                <form className="rate" ref="comment">
                    <textarea name="content" id="" placeholder="您对宝贝的评价很重要，我们决不妥协任何一次瑕疵。(非必填，默认填写为：宝贝不错，无须评价。)" onChange={this.handleCount}></textarea>
                    <p>还可以输入<span id="count">50</span>个字符</p>
                    {!this.props.params.Review?(
                    <div className="rate-star clearfix">
                        <span className="fl">商品满意度</span>
                        <div>
                            <label className={this.state.star[0]==1?"star cur":"star"}><input type="radio" name="star" value="0" onChange={e=>this.handleGetStars(e,0)} /></label>
                            <label className={this.state.star[1]==1?"star cur":"star"}><input type="radio" name="star" value="1" onChange={e=>this.handleGetStars(e,1)} /></label>
                            <label className={this.state.star[2]==1?"star cur":"star"}><input type="radio" name="star" value="2" onChange={e=>this.handleGetStars(e,2)} /></label>
                            <label className={this.state.star[3]==1?"star cur":"star"}><input type="radio" name="star" value="3" onChange={e=>this.handleGetStars(e,3)} /></label>
                            <label className={this.state.star[4]==1?"star cur":"star"}><input type="radio" name="star" value="4" onChange={e=>this.handleGetStars(e,4)} /></label>
                        </div>
                    </div>
                    ):''}
                    {!this.props.params.Review?(
                        <div className="rate-ctrl clearfix">
                            <span className="fl">综合满意度</span>
                            <div>
                                <label className={this.state.complex==2?"cur":""}><input type="radio" name="complex" defaultValue="1" onChange={e=>this.handleComplex(e,2)} />好评</label>
                                <label className={this.state.complex==1?"cur":""}><input type="radio" name="complex" defaultValue="2" onChange={e=>this.handleComplex(e,1)} />差评</label>
                            </div>
                        </div>
                    ):''}
                </form>
                <footer className="cart-footer rate-footer clearfix">
                    <aside className="fl"><Link to="/UserCenter">下次评价</Link></aside>
                    <a href="javascript:;" className={this.state.disabled?"disabled":""} onClick={e=>this.handleSendComment(e)}>{this.state.disabled?"提交中···":"提交评价"}</a>
                </footer>
            </div>
            
        )
    }
}