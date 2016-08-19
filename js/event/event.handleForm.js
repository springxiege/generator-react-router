/**
 * [handleForm 处理退、换货、退款表单事件]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
export default function handleForm(e){
    let name = e.target.name;
    let val = e.target.value;
    if(val == this.state.checked ){return false;}
    switch(name){
        case 'abandon_reason':
            this.setState({
                checked:val
            })
            break;
        case 'content':
            this.setState({
                content:val = val.length >50 ? val.substring(0,50) : val 
            })
            break;
    }
}