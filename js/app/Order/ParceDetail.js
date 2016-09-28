import React,{Component} from 'react'
import CopyRight from '../../components/CopyRight'
import ButtonCenter from '../../components/ButtonCenter'
import Recommend from '../../components/Recommend'
import scrollLoading from '../../event/event.scrollLoading'
export default class ParcelDetail extends Component{
    constructor(){
        super();
        this.state = {
            percel:'默认物流',
            data:[]
        };
        this.scrollLoading = scrollLoading.bind(this);
    }
    componentDidMount(){
        document.title = '物流状态'
        let express = this.props.params.express;
        let parcel = this.props.params.parcel;
        this.serverRequest = $.ajax({
            url: config.url + '/orders/logistics',
            type: 'GET',
            dataType: 'json',
            data: {
                express_coding:express,
                parcel_num:parcel
            },
            beforeSend: (request)=>{
                $.loading.show();
                config.setRequestHeader(request);
            },
            error: (error)=>{
                config.ProcessError(error);
            },
            success: (data)=>{
                if(parseInt(data.code) === 0){
                    if(data.data){
                        this.setState({
                            percel:data.data.expressDeliveryName,
                            data:data.data.Traces
                        })
                    }
                    
                }
            },
            complete: ()=>{
                $.loading.hide();
                _this.scrollLoading();
                window.addEventListener('scroll',_this.scrollLoading);
            }
        });
           
    }
    componentWillUnmount() {
        this.serverRequest.abort();
        window.removeEventListener('scroll',this.scrollLoading);
    }
    render(){
    
        return (
            <div className="main pdt135">
                <div className="main-parcel">
                    <p>{this.state.percel}：</p>
                    <p>{this.props.params.parcel}</p>
                </div>
                <div className="main-parcel-list">
                    <h2>物流跟踪</h2>
                    {!this.state.data.length ? (
                        <div className="nolist">暂无物流信息</div>
                    ) : (
                        this.state.data.map((item,index)=>{
                            return (
                                <div className="parcel-item">
                                    <p>{item.AcceptStation}</p>
                                    <p>{item.AcceptTime}</p>
                                </div>
                            )
                        })
                    )}
                </div>
                <Recommend />
                <ButtonCenter />
                <CopyRight clsName={"fixed"} />
            </div>
            
        )
    }
}