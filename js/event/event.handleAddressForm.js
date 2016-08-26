/**
 * [handleAddressForm 添加、编辑地址处理表单数据]
 * @param  {[type]} e    [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export default function handleAddressForm(e,type){
    let val = e.target.value;
    switch(type){
        case 'name':
            this.setState({
                name:val
            })
            break;
        case 'tel':
            this.setState({
                tel:val
            })
            break;
        case 'address':
            this.setState({
                address:val
            })
            break;
        case 'is_default':
            this.setState({
                checked:!this.state.checked
            })
            break;
        default:
            break;
    }
}