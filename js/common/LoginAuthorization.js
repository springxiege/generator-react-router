/**
 * @ 登录及微信授权
 * @ author xiege
 */
;(function (window, undefined, $) {
    var UserAgent = window.navigator.userAgent.toLowerCase(),
        isWX = UserAgent.indexOf('micromessenger') >= 0;
    // 首先检测是否支持localStorage
    // 检测通过后获取trade存储值
    // 如果存在trade值，则判断是否存在token或者token为空
    if(window.sessionStorage){
        var tradeStore = sessionStorage.getItem('trade');
        if(tradeStore){
            tradeStore = JSON.parse(tradeStore);
            if(!tradeStore.token){
                $.LoginAndGrantAuthorization();
            }else{
                var Minutes = window.config.tokenExpire || 55;
                var dt = new Date().getTime();
                var _oldTime = tradeStore.time,
                    _Provision = Minutes * 60;
                var _now = parseInt(_Provision - ((dt - _oldTime) / 1000));
                if (_now <= 0) {
                    _now = (Minutes * 60)
                    $.refreshToken(function(){
                        setInterval(function(){
                            if (_now <= 0) {
                                $.refreshToken();
                                _now = (Minutes * 60)
                            } else {
                                _now--
                            }
                        },1000)
                    });
                    
                } else {
                    setInterval(function () {
                        if (_now <= 0) {
                            $.refreshToken();
                            _now = (Minutes * 60)
                        } else {
                            _now--
                        }
                    }, 1000)
                }
            }
        }else{
            $.LoginAndGrantAuthorization();
        }
    }
    // if (store.enabled) {
    //     var tradeStore = store.get('trade');
    //     // console.log('token', tradeStore)
    //     if (!tradeStore || !tradeStore.token) {
    //         $.LoginAndGrantAuthorization();
    //     }
        
    //     var Minutes = window.config.tokenExpire || 55;
    //     var tradeStore = store.get('trade');
    //     if (tradeStore) {
    //         if (!tradeStore.token) {
    //             $.LoginAndGrantAuthorization()
    //         } else {
    //             var dt = new Date().getTime();
    //             var _oldTime = store.get('trade').time,
    //                 _Provision = Minutes * 60;
    //             var _now = parseInt(_Provision - ((dt - _oldTime) / 1000));
    //             if (_now <= 0) {
    //                 _now = (Minutes * 60)
    //                 $.refreshToken(function(){
    //                     setInterval(function(){
    //                         if (_now <= 0) {
    //                             $.refreshToken();
    //                             _now = (Minutes * 60)
    //                         } else {
    //                             _now--
    //                         }
    //                     },1000)
    //                 });
                    
    //             } else {
    //                 setInterval(function () {
    //                     if (_now <= 0) {
    //                         $.refreshToken();
    //                         _now = (Minutes * 60)
    //                     } else {
    //                         _now--
    //                     }
    //                 }, 1000)
    //             }
    //         }
    //     } else {
    //         $.LoginAndGrantAuthorization();
    //     }
    //     // $.LoginAndGrantAuthorization();
    // } else {
    //     alert('This browser does not supports localStorage')
    // };
    // if(isWX){

        // if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.on == "function") {
        //     WeixinJSBridge.on('closeWindow',{},function(res){
        //         console.log('close')
        //         store.remove('trade')
        //     })
        // } else {
        //     if (document.addEventListener) {
        //         document.addEventListener("WeixinJSBridgeReady", function(){
        //             WeixinJSBridge.on('closeWindow',{},function(res){
        //                 console.log('close')
        //                 store.remove('trade')
        //             })
        //         }, false);
        //     } else if (document.attachEvent) {
        //         document.attachEvent("WeixinJSBridgeReady", function(){
        //             WeixinJSBridge.on('closeWindow',{},function(res){
        //                 console.log('close')
        //                 store.remove('trade')
        //             })
        //         });
        //         document.attachEvent("onWeixinJSBridgeReady", function(){
        //             WeixinJSBridge.on('closeWindow',{},function(res){
        //                 console.log('close')
        //                 store.remove('trade')
        //             })
        //         });
        //     }
        // }
        
    // }
    
})(window, undefined, jQuery)
