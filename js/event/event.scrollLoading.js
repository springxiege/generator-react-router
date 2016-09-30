/**
 * [scrollLoading for React]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
import {findDOMNode} from 'react-dom'
export default function scrollLoading(opt){
    let _this = this;
    let defaults = {
        attr: "data-url",
        _src:"data-src",
        container: $(window),
        callback: $.noop
    }
    let params = $.extend(true, {}, defaults, opt);
    params.cache = [];
    $('.loadimg').each(function() {
        let node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"])||$(this).attr(params["_src"]);
        //重组
        let data = {
            obj: $(this),
            tag: node,
            url: url,
            src: url
        };
        params.cache.push(data);
    });
    let callback = function(call) {
        if ($.isFunction(params.callback)) {
            params.callback.call(call.get(0));
        }
        $(call).removeClass('loadimg').error(function(){
            $(this).prop('src', 'http://s.51lianying.com/images/xds/biz/d.jpg');
        });
    };
    let loading = function() {
            
        let contHeight = params.container.height();
        let contop;
        if (params.container.get(0) === window) {
            contop = $(window).scrollTop();
        } else {
            contop = params.container.offset().top;
        }       
        
        $.each(params.cache, function(i, data) {
            let o = data.obj, tag = data.tag, url = data.url, post, posb;
            
            if (o) {
                post = o.offset().top - contop, posb = post + o.height();
                if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
                    if (url) {
                        //在浏览器窗口内
                        if (tag === "img" || tag === "iframe") {
                            //图片，改变src
                            callback(o.attr("src", url));       
                        } else {
                            o.load(url, {}, function() {
                                callback(o);
                            });
                        }       
                    } else {
                        // 无地址，直接触发回调
                        callback(o);
                    }
                    data.obj = null;    
                }
            }
        }); 
        _this.productTabs && _this.productTabs.update();
    };
    loading();
    return loading;
}