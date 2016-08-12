/**
 * [AddressSubmit description]
 */
export default function FormVerify(param){
    let flag = true;
    let Verify = {
        tel:'请输入正确的手机号'
    }
    for(let i in param){
        let val = param[i]
        console.log(i+'->'+val)
        if($.trim(val)==''){
            flag = false;
            break;
        }
    }
    if(!flag){

    }
}