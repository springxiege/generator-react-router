;(function($){
    $.extend({
        /**
         * [error 提示消息框]
         * @param  {[type]} data [显示内容]
         * @param  {[type]} time [显示时间后立即隐藏]
         * @return {[type]}      [description]
         */
        error:function(data,time,callback){
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
                },(time||500), function() {
                    if(callback&&typeof callback == 'function')
                    $pop.remove();
                });
            },(time||500))
        },
        success:function(data){
            
        },
        alert:function(opts){
            var defaults = $.extend(true, {}, {
                content:'弹出信息',
                okBtn:null
            },opts);
            var _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<h2>'+defaults.content+'</h2>'
                                +'<div class="pop-btns clearfix">'
                                    +'<span class="pop-btn-cancle fl">取消</span>'
                                    +'<span class="pop-btn-ok fr">确认</span>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>';
            
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
                title:'', // 不传值则不显示
                content:'确认信息', // 传递显示的内容
                time:0, // 默认为0，不传值则不开启确认键计时
                CancelBtn:null, // 取消键的回调函数
                okBtn:null // 确认键的回调函数
            },opts); 
            var _HTML = '<div class="pop-confirm ask" id="pop-confirm">'
                        +'<div class="pop-container">'
                            +'<div class="pop-main">'
                                +'<i class="pop-btn-close"></i>'
                                +'<div class="pop-content '+defaults.contentclsName+'">'+defaults.content+'</div>'
                                +'<div class="pop-btns clearfix">'
                                    +'<span class="pop-btn-cancle fl">取消</span>'
                                    +'<span class="pop-btn-ok fr">确认</span>'
                                +'</div>'
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
                                +'<div class="pop-btns clearfix">'
                                    +'<span class="pop-btn-cancle fl">取消</span>'
                                    +'<span class="pop-btn-ok disabled fr">确认</span>'
                                +'</div>'
                            +'</div>'
                        +'</div>'
                    +'</div>';
            }
            // 插入dom
            if($('#pop-confirm').length === 0){
                $('body').append(_HTML)
            }
            var $pop = $('#pop-confirm'),
                _height = $pop.find('.pop-main').height();
            // 居中
            $pop.find('.pop-main').css({
                'margin-top': -(_height/2)
            });
            // 取消
            $pop.on('click touchend', '.pop-btn-close,.pop-btn-cancle', function(event) {
                if(opts.CancelBtn && typeof opts.CancelBtn === 'function'){
                    opts.CancelBtn();
                };
                $pop.remove();
            });
            // 确定
            $pop.on('click touchend', '.pop-btn-ok', function(event) {
                if(opts.okBtn && typeof opts.okBtn === 'function'&&!$(this).hasClass('disabled')){
                    opts.okBtn();
                    $pop.remove();
                }else{
                    return false;
                }
            });
            // 计时
            if(defaults.time){
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
        }
    });
        
})(jQuery)