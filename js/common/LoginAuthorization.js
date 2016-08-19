/**
 * @ 登录及微信授权
 * @ author xiege
 */
;(function (window, undefined, $) {
    var UserAgent = window.navigator.userAgent.toLowerCase(),
        isWX = UserAgent.indexOf('micromessenger') >= 0;

    /*
     * 将url上的?以后的参数变更成一个对象
     */
    var getJsonFromUrl = function (hashBased) {
        var query;
        if (hashBased) {
            var pos = location.href.indexOf("?");
            if (pos == -1) return {};
            query = location.href.substr(pos + 1);
        } else {
            query = location.search.substr(1);
        }
        var result = {};
        query.split("&").forEach(function (part) {
            if (!part) return;
            part = part.split("+").join(" "); // replace every + with space, regexp-free version
            var eq = part.indexOf("=");
            var key = eq > -1 ? part.substr(0, eq) : part;
            var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
            var from = key.indexOf("[");
            if (from == -1) result[decodeURIComponent(key)] = val;
            else {
                var to = key.indexOf("]");
                var index = decodeURIComponent(key.substring(from + 1, to));
                key = decodeURIComponent(key.substring(0, from));
                if (!result[key]) result[key] = [];
                if (!index) result[key].push(val);
                else result[key][index] = val;
            }
        });
        return result;
    }
    // 如果token为空且处于非微信环境下，则跳转登录
    // 反之则请求微信授权
    var LoginAndGrantAuthorization = function () {
        if (isWX) {
            // 微信中检测是否存在token
            // 若为空，则进行微信请求授权

            // 构建参数对象
            var params = getJsonFromUrl(window.location.href);
            params.currentUrl = window.location.origin + window.location.pathname;
            $.ajax({
                url: config.hosts + '/token',
                type: 'GET',
                dataType: 'json',
                data: params,
                error: function (error) {
                    console.log(error)
                },
                success: function (response) {
                    if (response.code) {
                        window.location.href = response.data.redirectUrl;
                    } else {
                        var token = response.data.token,
                            tokenExpireTime = response.data.expire;

                        window.config.head = token;
                        // store token expire
                        window.config.tokenExpire = (tokenExpireTime - 1 ) > 0 ? tokenExpireTime - 1 : 0;
                        config.setStorage('trade', 'token', token);
                        config.setStorage('trade', 'time', new Date().getTime());
                        config.setStorage('trade', 'userinfo', response.data.data);
                    }
                }
            });
        } else {
            var _url = window.location.hash.replace('#', '').replace(/\?.{0,}/gi, '').toLowerCase(),
                Verify = ['', '/', 'register', 'productdetails', 'allgoods'], // PC端过滤不需要验证是否登录的页面
                flag = true;  // 标识符，用来
            $.each(Verify, function (index, val) {
                if (_url.indexOf(val) >= 0) {
                    flag = false;
                    return false;
                }
            });
            if (!flag) {
                return false;
            }
            window.location.hash = '#/Register' + _url
        }
    };
    // 首先检测是否支持localStorage
    // 检测通过后获取trade存储值
    // 如果存在trade值，则判断是否存在token或者token为空
    if (store.enabled) {
        var tradeStore = store.get('trade');
        // console.log('token', tradeStore)
        if (!tradeStore || !tradeStore.token) {
            LoginAndGrantAuthorization();
        }
        
        var Minutes = window.config.tokenExpire || 55;
        var tradeStore = store.get('trade');
        if (tradeStore) {
            if (!tradeStore.token) {
                LoginAndGrantAuthorization()
            } else {
                var dt = new Date().getTime();
                var _oldTime = store.get('trade').time,
                    _Provision = Minutes * 60;
                var _now = parseInt(_Provision - ((dt - _oldTime) / 1000))
                console.log(_now)
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
        } else {
            LoginAndGrantAuthorization()
        }
        
    } else {
        alert('This browser does not supports localStorage')
    }
    ;
})(window, undefined, jQuery)
