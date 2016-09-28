
;(function(window,undefined,$){
    $.extend({
        /**
         * @ 非微信中存储token
         * @ author xiege
         */
        setTokenForPC:function(token,userInfo){
            if(window.sessionStorage){
                var _data = {token:token,userinfo:userInfo,time:new Date().getTime()};
                window.sessionStorage.setItem('trade',JSON.stringify(_data))
            }
            // if(store.enabled){
            //     config.setStorage('trade','token',token)
            //     config.setStorage('trade','userinfo',userInfo);
            //     config.setStorage('trade','time',new Date().getTime());
            // }else {
            //     console.error('This browser does not supports localStorage')
            // }
        },
        LoginAndGrantAuthorization:function(){
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
            if (window.config.isWX) {
                // 微信中检测是否存在token
                // 若为空，则进行微信请求授权

                // 构建参数对象
                var params = getJsonFromUrl(window.location.href);
                params.currentUrl = window.location.origin + window.location.pathname;
                params.action = window.location.hash;
                if(params.currentUrl.indexOf('shop') < 0){
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
                                if(parseInt(response.data.code) != 10002){
                                    window.location.href = response.data.redirectUrl;
                                }
                            } else {
                                var token = response.data.token,
                                    tokenExpireTime = response.data.expire;

                                window.config.head = token;
                                // store token expire
                                window.config.tokenExpire = (tokenExpireTime - 1 ) > 0 ? tokenExpireTime - 1 : 0;
                                var _data = {token:token,userinfo:response.data.data,time:new Date().getTime}
                                window.sessionStorage.setItem('trade',JSON.stringify(_data))
                                if(!!response.data.redirectUrl){
                                    window.location.href = response.data.redirectUrl;
                                }
                                // config.setStorage('trade', 'token', token);
                                // config.setStorage('trade', 'time', new Date().getTime());
                                // config.setStorage('trade', 'userinfo', response.data.data);
                            }
                        }
                    });
                }
                
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
        },
        /**
         * 更新PC端token，防止页面报错
         */
        refreshToken:function(callback){
            if(config.flag){
                config.flag = false;
                $.ajax({
                    url: config.url + '/auth/refresh/?v='+Math.random()*100+'&token=' + config.head,
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    error:function(error){
                        if(error.status === 401 && error.responseJSON.code === 1){
                            // alert('刷新token失败，请重新登录');
                            if(!window.config.isWX){
                                window.location.hash = '#/Register';
                            }else{
                                $.LoginAndGrantAuthorization()
                            }
                        }
                    },
                    /*
                    beforeSend:function(request){
                        config.setRequestHeader(request);
                    },
                    */
                    success:function(data){
                        config.flag = true;
                        if(parseInt(data.code) === 0){
                            // config.setStorage('trade','time',new Date().getTime());
                            // config.setStorage('trade','token',data.data.token);
                            var tradeStore = JSON.parse(window.sessionStorage.getItem('trade'))
                            tradeStore.time = new Date().getTime;
                            tradeStore.token = data.data.token;
                            window.sessionStorage.setItem('trade',JSON.stringify(tradeStore));
                            // config.setStorage('trade','userinfo',data.data.user);
                            config.head = data.data.token;
                            callback && callback(data.data)
                        };
                        if(parseInt(data.code) === 1){
                            // alert('刷新token失败，请重新登录');
                            if(!config.isWX){
                                var _hash = window.location.hash;
                                _hash = _hash.replace('#','').replace(/\?.{1,}/gi,'');
                                window.location.hash = '#/Register' + _hash;
                            }
                        }
                    }
                })
            }
        },
        /**
         * [tips 提示消息框]
         * @param  {[type]} data [显示内容]
         * @param  {[type]} time [显示时间后立即隐藏]
         * @return {[type]}      [description]
         */
        tips:function(data,time,callback){
            var _HTML = '<div class="pop-error" id="pop-error">'+data+'</div>'
            if($('#pop-error').length === 0){
                $('body').append(_HTML);
            }
            var $pop = $('#pop-error')
            var _width = $pop.outerWidth(true);
            $pop.css({
                'margin-left': -(_width/2)
            });
            setTimeout(function(){
                $pop.animate({
                    opacity:0
                },(time||1200), function() {
                    if(callback && (typeof(callback) == 'function')){
                        callback()
                    }
                    $pop.remove();
                });
            },(time||1200))
        },
        /**
         * [loadingtips 请求过程中的loading]
         * @param  {[type]} type [状态，为真表示显示，反之删除dom]
         * @param  {[type]} data [传入显示文本]
         * @return {[type]}      [description]
         */
        loadingtips:function(type,data){
            if(type == 'show' || type == 1 || type == true){
                var _HTML = '<div class="pop-error" id="pop-error">'+data+'</div>'
                if($('#pop-error').length === 0){
                    $('body').append(_HTML);
                }
                var $pop = $('#pop-error');
                var _width = $pop.outerWidth(true);
                $pop.css({
                    'margin-left': -(_width/2)
                });
            }
            if(type == 'hide' || type == 0 || type == false){
                var $pop = $('#pop-error');
                $pop.remove();
            }
        },
        /**
         * [confirm 确认弹窗]
         * @param  {[type]} opts [传递的参数集合，defaults设置有默认值]
         * @return {[type]}      [description]
         */
        confirm:function(opts){
            var defaults = $.extend(true, {}, {
                titleclsName:'', // 当传入了title值时，这里传递值才会生效
                contentclsName:'',
                remove:true,
                init:null,  //初始化函数
                title:'', // 不传值则不显示
                content:'确认信息', // 传递显示的内容
                time:0, // 默认为0，不传值则不开启确认键计时
                CancelBtn:null, // 取消键的回调函数
                okBtn:null // 确认键的回调函数
            },opts);
            var _btnHtml = '<div class="pop-btns clearfix">'
                                +'<span class="pop-btn-cancle fl">取消</span>'
                                +'<span class="pop-btn-ok fr">确认</span>'
                            +'</div>'
            if(typeof defaults.CancelBtn){
                _btnHtml = '<div class="pop-btns clearfix">'
                                +'<span class="pop-btn-ok pop-btn-block">确认</span>'
                            +'</div>'
            }
            var _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<div class="pop-content '+defaults.contentclsName+'">'+defaults.content+'</div>'
                                +_btnHtml
                            +'</div>'
                        +'</div>'
                    +'</div>';
            if(defaults.title != ''){
                _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<div class="pop-title '+defaults.titleclsName+'">'+defaults.title+'</div>'
                                +'<div class="pop-content '+defaults.contentclsName+'">'+defaults.content+'</div>'
                                +_btnHtml
                            +'</div>'
                        +'</div>'
                    +'</div>';
            }
            // 插入dom
            if($('#pop-confirm').length === 0){
                $('body').append(_HTML);
            }
            var $pop = $('#pop-confirm'),
                _height = $pop.find('.pop-main').height();
            if(defaults.init && (typeof(defaults.init) === 'function')){
                defaults.init($pop)
            }
            // 居中
            $pop.find('.pop-main').css({
                'margin-top': -(_height/2)
            });
            // 取消
            $pop.on('click touchend', '.pop-btn-close,.pop-btn-cancle', function(event) {
                if(defaults.CancelBtn && typeof defaults.CancelBtn === 'function'){
                    defaults.CancelBtn();
                };
                $pop.remove();
                return false;
            });
            // 确定
            $pop.on('click touchend', '.pop-btn-ok', function(event) {
                if(defaults.okBtn && typeof defaults.okBtn === 'function'&&!$(this).hasClass('disabled')){
                    defaults.okBtn($pop);
                    if(defaults.remove){$pop.remove();}
                }
                return false;
            });
            // 计时
            if(defaults.time){
                $pop.find('.pop-btn-ok').addClass('disabled');
                var _time = defaults.time;
                var timer = setInterval(function(){
                    if(_time==0){
                        clearInterval(timer);
                        timer=null;
                        $pop.find('.pop-btn-ok').html('确认').removeClass('disabled');
                    }else{
                        $pop.find('.pop-btn-ok').html('确认('+(_time--)+')');
                    }
                },1000)
            }else{
                $pop.find('.pop-btn-ok').removeClass('disabled');
            }
        },
        /**
         * [loading 页面加载]
         * @type {Object}
         */
        loading:{
            show:function(){
                if(!$('#mobi_page_loading').length){
                    $('body').append('<div id="mobi_page_loading"></div>')
                }else{
                    $('#mobi_page_loading').show();
                }

            },
            hide:function(){
                $('#mobi_page_loading').remove();
            }
        }
    });

})(window,undefined,jQuery)
