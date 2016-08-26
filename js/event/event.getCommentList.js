const SERVER = config.url + '/goods/comment/'
import { 
    GetComment
} from '../actions/ActionFuncs'
import {findDOMNode} from 'react-dom'
export default function getCommentList(id,type){
    let defaults = Object.assign({},{
        pagesize:10,
        page:1,
        type:0,
        loadComment:true,
        flag:true,
        noMore:false,
        winHeight:$(window).height(),
        callback:null
    },this.state);
    let params = {
        pagesize:defaults.pagesize,
        page:defaults.page,
        summary:type
    };
    $.ajax({
        url: SERVER + id,
        type: 'GET',
        dataType: 'json',
        data: params,
        beforeSend:(request)=>{
            config.setRequestHeader(request);
            this.setState({
                type:type,
                nolist:false,
                loadMore:true,
                noMore:false
            })
            // $('.coment-list').remove();
            this.props.dispatch(GetComment([]))
        },
        error:(error)=>{
            config.ProcessError(error);
        },
        success:(data)=>{
            if(parseInt(data.code) === 0){
                if(data.data.data){
                    this.props.dispatch(GetComment(data.data.data))
                    let activeIndex = this.productTabs.activeIndex
                    setTimeout(()=>{
                        this.productTabs && this.productTabs.updateContainerSize()
                        this.productTabs && this.productTabs.updateSlidesSize();
                        this.productTabs && this.productTabs.updateProgress();
                        this.productTabs && this.productTabs.updatePagination();
                        this.productTabs && this.productTabs.updateClasses();
                        this.productTabs && this.productTabs.update();
                        if(this.productTabs){
                            this.productTabs.height = $(findDOMNode(this.refs.productTabs)).find('.swiper-slide').eq(activeIndex).height();
                        }

                    },800);
                    if(!data.data.next_page_url){
                        this.setState({
                            flag:false,
                            noMore:true
                        })
                    }else{
                        this.setState({
                            flag:true,
                            noMore:true
                        })
                    }
                }else{
                    this.setState({
                        flag:false,
                        noMore:true,
                        loadMore:false,
                        nolist:true
                    })
                    this.props.dispatch(GetComment([]))
                };
                this.setState({
                    loadComment:false,
                    url: config + '/goods/comment/' + id + '?summary=' + type
                })
            }
        }
    });
    
}