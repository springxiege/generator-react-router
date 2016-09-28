/**
 * [CommitForm 提交退、换货，退款表单]
 */
export default function CommitForm (){
    let orderid = this.props.params.orderId;
    let abandon_reason = this.state.data[this.state.checked];
    let content = this.state.content;
    if(!this.state.disabled){
        this.setState({
            disabled:true
        });
        $.ajax({
            url: this.state.url,
            type: 'POST',
            dataType: 'json',
            data: {
                _method:'put',
                ids:[orderid],
                type:this.state.type,
                abandon_reason:abandon_reason,
                leave_message:content
            },
            beforeSend:(request)=>{
                config.setRequestHeader(request);
            },
            error:(error)=>{
                config.ProcessError(error);
            },
            success:(data)=>{
                $.loading.hide();
                if(parseInt(data.code) === 0){
                    switch(this.props.params.type){
                        case 'ReturndOrder':
                            window.location.hash = '#/Tracking/'+orderid
                            break;
                        case 'ReceiptOrder':
                            window.location.hash = '#/ReturnOrder'
                            break;
                        case 'UnfilledOrder':
                            window.location.hash = '#/ReturnOrder'
                            break;
                        default:
                            window.location.hash = '#/ReturnOrder'
                            break;
                    }
                    
                }else{
                    $.tips(data.data.msg,1000)
                }
            },
            complete:()=>{
                this.setState({
                    disabled:false
                })
            }
        })
    }
    
}