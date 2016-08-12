/**
 * 我的收藏夹
 */
import React from 'react'
import {connect} from 'react-redux'
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute
} from 'react-router';
import {
    getCollectList,
    CancelCollect,
    getMoreCollectList
} from '../actions/ActionFuncs'
import CollectList from '../components/CollectList'
import CopyRight from '../components/CopyRight'
import ReturnTop from '../components/ReturnTop'
class MyCollect extends React.Component {
    constructor(){
        super();
        let _this = this;
        /**
         * [url 请求url获取数据
         *  pagesize 返回的数据每一页的条数
         *  page 请求的第几页
         *  flag 请求标识，当正在请求中时该标识为false则不能再次请求
         *  noMore 请求更多标识，为true则表示没有更多数据了，不再进行请求
         *  winHeight window的窗口高度
         *  callback 回调函数，请求成功后执行]
         * @type {[type]}
         */
        this.state = {
            url: config.url + '/orders/prepayment',
            pagesize: 3,
            page: 2, 
            flag: true, 
            noMore: false,
            winHeight: $(window).height(),
            callback: function(pdata){ 
                if(parseInt(pdata.code) === 0){
                    if(pdata.data.data && pdata.data.data.length){
                        let curData = _this.props.state.data;
                        let newData = curData.concat(pdata.data.data);
                        _this.props.dispatch(getMoreCollectList(newData));
                    }
                }else{
                    // 如果token失效
                }
            },
        };
        this.loadMorePage = this.loadMorePage.bind(this);
    }
    componentDidMount(){
        document.title = '我的收藏';
        let _this = this;
        this.serverRequest = $.ajax({
            url: config.url + '/goods/collect',
            type: 'GET',
            dataType: 'json',
            data: {
                pagesize:_this.state.pagesize,
                page:1
            },
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                $.loading.hide();
                if(parseInt(data.code) == 0){
                    if(data.data.data){
                        this.props.dispatch(getCollectList(data.data))
                    }
                    if(parseInt(data.data.last_page) <= 1){
                        $('#loading-more').html('已全部加载')
                    }else{
                        window.addEventListener('scroll',_this.loadMorePage);
                    };
                    if(parseInt(data.data.last_page) === 0){
                        $('#loading-more').hide();
                    }
                }
            }
        })
        
    }
    loadMorePage(){
        let opt = this.state;
        let _scrollTop = $(window).scrollTop();
        let _bodyHeight = $('body').height();
        if(_scrollTop >= (_bodyHeight - opt.winHeight)){
            if(opt.flag && !opt.noMore){
                $.ajax({
                    url:opt.url,
                    type:'GET',
                    dataType:'json',
                    data:{
                        pagesize:opt.pagesize,
                        page:opt.page
                    },
                    beforeSend:(request)=>{
                        this.setState({
                            flag:false
                        })
                        config.setRequestHeader(request);
                    },
                    error:(error)=>{
                        console.error(error)
                    },
                    success:(data)=>{
                        opt.callback && opt.callback(data);
                        this.setState({
                            flag:true
                        })
                        if(data.data.data.length){
                            let nextpage = (opt.page - 0) + 1;
                            this.setState({
                                page:nextpage
                            });
                            if(parseInt(nextpage) > parseInt(data.data.last_page)){
                                this.setState({
                                    noMore:true
                                });
                                $('#loading-more').html('已全部加载');
                            };
                        }else{
                            this.setState({
                                noMore:true
                            })
                        }
                    }
                })
            }
        }
    }
    componentWillUnmount() {
        this.serverRequest.abort() 
    }
    render(){
        return (
            <div>
                <CollectList data={this.props.state} />
                <CopyRight clsName={"fixed"} />
                <ReturnTop />
            </div>
        )
    }
};
function select(state){
    return {state:state.MyCollect};
}
export default connect(select)(MyCollect);
