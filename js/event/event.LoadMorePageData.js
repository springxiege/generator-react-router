/** 
 * [LoadMorePageData 列表页加载更多页数据公用方法]
 * @param {[type]} opt [参数配置项]
 * @author [xiege]
 * @augments {
 *    url -> 请求接口
 *    pagesize -> 每页返回的条数
 *    page -> 下一页
 *    flag -> 加载标识，防止多次请求
 *    noMore -> 加载最后一页标识
 *    winHeight -> 当前浏览器的可见高度
 *    callback -> 回调函数
 *    最主要参数【this.state】
 * }
 */
export default function LoadMorePageData(){
    let defaults = $.extend(true, {}, {
        url:'',
        pagesize:config.pagesize,
        page:2,
        flag:true,
        noMore:false,
        winHeight:$(window).height(),
        callback:null
    },this.state);
    let _scrollTop = $(window).scrollTop();
    let _bodyHeight = $('body').height();
    if(_scrollTop >= (_bodyHeight - defaults.winHeight)){
        if(defaults.flag && !defaults.noMore){
            $.ajax({
                url:defaults.url,
                type:'GET',
                dataType:'json',
                data:{
                    pagesize:defaults.pagesize,
                    page:defaults.page
                },
                beforeSend:(request)=>{
                    this.setState({
                        flag:false
                    })
                    config.setRequestHeader(request);
                },
                error:(error)=>{
                    config.ProcessError(error);
                },
                success:(data)=>{
                    defaults.callback && defaults.callback(data);
                    this.setState({
                        flag:true
                    })
                    if(data.data.data.length){
                        let nextpage = (defaults.page - 0) + 1;
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