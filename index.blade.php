<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no,minimal-ui">
    <meta name="hotcss" content="design-width=640,initial-dpr=1">
    <meta name="format-detection" content="telephone=no" />
    <!-- <meta name="x5-fullscreen" content="true">
    <meta name="full-screen" content="yes"> -->
    <title>商品详情</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/main-title.css">
    <link rel="stylesheet" href="/css/main-price.css">
    <link rel="stylesheet" href="/css/main-sku.css">
    <link rel="stylesheet" href="/css/main-images.css">
    <link rel="stylesheet" href="/css/main-detailtab.css">
    <link rel="stylesheet" href="/css/main-description.css">
    <link rel="stylesheet" href="/css/main-usercenter.css">
    <link rel="stylesheet" href="/css/main-msg.css">
    <link rel="stylesheet" href="/css/main-shopcart.css">
    <link rel="stylesheet" href="/css/main-settings.css">
    <link rel="stylesheet" href="/css/main-rate.css">
    <link rel="stylesheet" href="/css/main-pay.css">
    <link rel="stylesheet" href="/css/main-order.css">
    <link rel="stylesheet" href="/css/main-comment.css">
    <link rel="stylesheet" href="/css/main-collect.css">
    <link rel="stylesheet" href="/css/main-buylist.css">
    <link rel="stylesheet" href="/css/main-buy.css">
    <link rel="stylesheet" href="/css/main-allgoods.css">
    <link rel="stylesheet" href="/css/main-address.css">
    <link rel="stylesheet" href="/css/main-account.css">
    <link rel="stylesheet" href="/js/plugins/swiper/swiper.min.css">
    <script src="/js/plugins/hotcss/hotcss.js"></script>
    <script src="http://s.51lianying.com/min/f=/js/weixin/share.min.js"></script>
</head>
<body>
    <div id="mobi_page_loading">
        <!-- <div class="page-loader page-loader-circularSquare"></div> -->
    </div>
    <div id="app"></div>
    <div id="sku"></div>
    <script src="/js/plugins/jquery/jquery-1.12.4.min.js"></script>
    <!-- <script src="http://s.51lianying.com/min/f=/js/biz/gallery/plugin/jquery-scroll-loading/scroll_loading.min.js"></script> -->
    <script src="/js/plugins/store-localstorage/store.min.js"></script>
    <script src="/js/plugins/swiper/swiper.min.js"></script>
    <script>
    	window.config = {};
    	window.wxShareConfig = {'title':'<?php echo $goods['title'];?>','desc':'<?php echo $goods['description']; ?>','src':'<?php echo $goods['logo'];?>'};
        @if (config('app.env') == 'local')
            window.config.url = 'http://api.51lianying.local';
            window.config.hosts = 'http://trade.51lianying.mobi.local';
            window.config.api = 'http://api.51lianying.local';
        @else (config('app.env') == 'test')
            window.config.url = 'http://test.api.51lianying.com';
            window.config.hosts = 'http://trade.51lianying.mobi';
            
        @endif
        config.state = function(type){
            LYA({
                action: ['share'],
                debug: false,
                param: {
                    buy_id: config.buyid,
                    goods_id: config.goods_id,
                    come_from: 'xds',
                    share_type:type
                }
            });
        };
        
        // 分享
        window.share_config = {
            title : wxShareConfig.title,//标题
            desc : '我要联赢',//描述 
            link : window.location.href,//链接地址   
            imgUrl : wxShareConfig.src,//图片地址
            shareTrigger: function (res) {
                console.log('trigger');
            },
            shareSuccess: function (res, channel) {
                 console.log(res);
                switch (channel) {
                    case 'toFriend':
                        config.state('share_weixin_to_friend');
                        break; 
                    case 'toTimeline':
                        config.state('share_weixin_to_timeline');
                        break; 
                    case 'toQQ':
                        config.state('share_weixin_to_qq');
                        break; 
                    case 'toWeibo':
                        config.state('share_weixin_to_weibo');
                        break; 
                    default:
                        break;
                }
                // share_stat(_code);
            },

            shareCancel: function (res) {
                console.log('cancel');
                // share_stat('3');
            },
            shareFail: function (res) {
                console.log('fail');
                // share_stat('4');
            }
        };

    </script>
    <script src="/js/common/config.js"></script>
    <script src="/js/common/jquery.common.js"></script>
    <script src="/js/common/LoginAuthorization.js"></script>
    <script src="/js/analysis.js"></script>
    <script src="/dist/js/app/bundle.js"></script>
</body>
</html>
