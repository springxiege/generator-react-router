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
    // 更新PC端token，防止页面报错
    var refreshToken = function(token,callback){
        $.ajax({
            url: config.url + '/auth/refresh',
            type: 'GET',
            dataType: 'json',
            data: {},
            error:function(error){
                console.error(error);
            },
            beforeSend:function(request){
                if(config.head!=''){
                    request.setRequestHeader("Authorization", "Bearer " + config.head);
                }
            },
            success:function(data){
                if(parseInt(data.code) === 0){
                    var dt = new Date();
                        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
                        var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
                    config.setStorage('trade','time',date);
                    config.setStorage('trade','token',data.data.token);
                    config.setStorage('trade','userinfo',data.data.user);

                    config.head = data.data.token;

                    callback && callback(data.data)
                }
            }
        })
    };
    // 首先检测是否支持localStorage
    // 检测通过后获取trade存储值
    // 如果存在trade值，则判断是否存在token或者token为空
    if(store.enabled){
        var tradeStore = store.get('trade');
        var Minutes = 5;
        if(tradeStore){
            if(!tradeStore.token){
                LoginAndGrantAuthorization()
            }else{
                var dt = new Date();
                dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
                var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
                var _oldTime = store.get('trade').time,
                    _oldSeconds = new Date(_oldTime).getTime()/1000,
                    _newSeconds = new Date(date).getTime()/1000,
                    _seconds = (((_newSeconds - _oldSeconds)/3600*60*60)),
                    _Provision = Minutes*60;
                var _now = _Provision - _seconds
                if(_now <= 0){
                    refreshToken(tradeStore.token,function(data){
                            _now = (Minutes*60)
                    });
                }else{
                    setInterval(function(){
                        if(_now <= 0){
                            var _tradeStore = store.get('trade')
                            refreshToken(_tradeStore.token);
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

})(window,undefined,jQuery)
