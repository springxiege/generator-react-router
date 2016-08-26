/**
 * [checkLogin 检测用户是否登录]
 * @return {[type]} [description]
 */
export default function checkLogin(){
    if(!window.config.isWX){
        if(window.sessionStorage){
            var tradeStore = JSON.parse(window.sessionStorage.getItem('trade'));
            if(!tradeStore){
                window.location.hash = '#/Register/'
                return false;
            }else{
                if(!tradeStore.token){
                    window.location.hash = '#/Register/'
                    return false;
                }
            }
        }else{
            alert('This browser does not supports localStorage')
            return false;
        }
    }
    return true;
}