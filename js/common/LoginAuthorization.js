/**
 * @ 登录及微信授权
 * @ author xiege
 */
;(function(window,undefined,$){
    var UserAgent = window.navigator.userAgent.toLowerCase(),
        isWX =  UserAgent.indexOf('micromessenger') >= 0;
    // 如果token为空且处于非微信环境下，则跳转登录
    // 反之则请求微信授权
    var LoginAndGrantAuthorization = function(){
        if(isWX){
            // 微信中检测是否存在token
            // 若为空，则进行微信请求授权
            if($.isEmptyObject(window.config.wxData)) {
                $.ajax({
                    url: 'http://trade.51lianying.mobi/token?currentUrl='+window.location.href.replace('#','@'),
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    error:function(error){
                        console.log(error)
                    },
                    success:function(data){
                        window.location.href = data.data.redirectUrl;
                    }
                })
            }else{
                window.config.head = window.config.wxData.token;
                config.setStorage('trade','token',window.config.wxData.token);
                config.setStorage('trade','time',new Date().getTime());
            }
        }else{
            var _url = window.location.hash.replace('#','').replace(/\?.{0,}/gi,'').toLowerCase(),
                Verify = ['register','productdetails','allgoods'], // PC端过滤不需要验证是否登录的页面
                flag = true;  // 标识符，用来
            $.each(Verify, function(index, val) {
                if(_url.indexOf(val)>=0){
                    flag = false;
                    return false;
                }
            });
            if(!flag){
                return false;
            }
            window.location.hash = '#/Register' + _url
        }
    };
    // 首先检测是否支持localStorage
    // 检测通过后获取trade存储值
    // 如果存在trade值，则判断是否存在token或者token为空
    if(store.enabled){
        var tradeStore = store.get('trade');
        var Minutes = 55;

        if(tradeStore){
            if(!tradeStore.token){
                LoginAndGrantAuthorization()
            }else{
                var dt = new Date().getTime();
                var _oldTime = store.get('trade').time,
                    _Provision = Minutes*60;
                var _now = parseInt(_Provision - ((dt-_oldTime)/1000))
                if(_now <= 0){
                    $.refreshToken();
                    _now = (Minutes*60)
                }else{
                    setInterval(function(){
                        if(_now <= 0){
                            $.refreshToken();
                            _now = (Minutes*60)
                        }else{
                            _now--
                        }
                    },1000)
                }
            }
        }else{
            LoginAndGrantAuthorization()
        }
    }else{
        alert('This browser does not supports localStorage')
    }

    // 错误图片替换
    $('img').error(function() {
        /* Act on the event */
        $(this).prop({
            src:'/images/logobg.gif'
        })
    });

})(window,undefined,jQuery)
