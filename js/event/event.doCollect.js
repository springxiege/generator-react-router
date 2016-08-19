/**
 * [doCollect 商品的收藏与取消收藏]
 * @return {[type]} [description]
 */
import {
    AddCollect,
    CancelCollect
} from '../actions/ActionFuncs'
import checkLogin from '../event/event.checkLogin'
export default function doCollect(){
    let _id = this.state.id ||'1'
    if(!checkLogin()){return false;}
    let _param  = {}
    if(this.state.collect){
        _param._method = 'delete'
    }
    $.ajax({
        url: config.url + '/goods/collect/'+_id,
        type: 'POST',
        dataType: 'json',
        data: _param,
        beforeSend:(request)=>{
            config.setRequestHeader(request);
        },
        error:function(error){
            if(_param._method){
                $.tips('取消收藏失败，请重试')
            }else{
                $.tips('收藏失败，请重试')
            }
            config.ProcessError(error);
        },
        success:(data)=>{
            if(parseInt(data.code)==0){
                if(_param._method){
                    this.props.dispatch(CancelCollect());
                    $.tips('取消收藏成功');
                    this.setState({
                        collect:false
                    })
                }else{
                    this.props.dispatch(AddCollect());
                    $.tips('收藏成功');
                    this.setState({
                        collect:true
                    })
                }
            }
        }
    })
}