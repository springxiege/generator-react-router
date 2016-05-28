/**
 * @ 登录授权
 * @ author xiege
 */
$(function(){
    var LoginAuthorization = {
        UserAgent: window.navigator.userAgent.toLowerCase(),
        isWX: function(){
            return this.UserAgent.indexOf('micromessenger')>=0
        },
        CheckBrowser: function(){
            var _this = this;
            if(_this.isWX()){
                return true;
            }else{
                return false;
            }
        },
        getToken: function(){
            var _this = this,
                _url = window.location.href,
                browser;
            browser = _this.CheckBrowser() ? 'wx' : '';
            // $.ajax({
            //     url: '/path/to/file',
            //     type: 'POST',
            //     dataType: 'json',
            //     data: {
            //         url: _url,
            //         type: browser
            //     },
            //     success: function(data){
            //         console.log(data)
            //     }
            // });
        },
        // 扩展store.min.js实现本地储存对象字符串
        setStorage: function(objName,key,val){
            var _data = {};
            _data[objName] = {};
            _data[objName].data = store.get(objName)||{};
            _data[objName].data[key] = val;
            store.set(objName,_data[objName].data);
        },
        setToken: function(){
            var _this = this,
                _token = _this.getToken();
            if(store.enabled){
                var tradeStore = store.get('trade');
                var dt = new Date();
                dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区偏移
                var date = dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
                if(!tradeStore){
                    this.setStorage('trade','token','111111111');
                    this.setStorage('trade','time',date);
                }else{
                    var _oldTime = store.get('trade').time;
                    var _oldSeconds = new Date(_oldTime).getTime()/1000,
                        _newSeconds = new Date(date).getTime()/1000;
                    var hours = (((_newSeconds - _oldSeconds)/3600))
                    console.log(hours)
                }
            }else {
                console.error('This browser does not supports localStorage')
            }
        }
    };
    LoginAuthorization.setToken();
})
