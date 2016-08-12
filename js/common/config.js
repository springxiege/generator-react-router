// 检测客户端
window.config.UserAgent = window.navigator.userAgent.toLowerCase();
window.config.isWX = window.config.UserAgent.indexOf('micromessenger') >= 0;
// 扩展store.min.js实现本地储存对象字符串
config.setStorage = function(objName,key,val){
    var _data = {};
    _data[objName] = {};
    _data[objName].data = store.get(objName)||{};
    _data[objName].data[key] = val;
    store.set(objName,_data[objName].data);
};
// 比较两个对象是否相同
config.isObjectValueEqual = function(a,b){
    var a = JSON.stringify(a),
        b = JSON.stringify(b);
    return a===b
};
// 开启关闭传递token
if(store.get('trade') && store.get('trade').token){
    window.config.head = store.get('trade').token
}else{
    window.config.head = ''
};
// 请求设置header头添加token
config.setRequestHeader = function(request){
    if(config.head!=''){
        request.setRequestHeader("Authorization", "Bearer " + config.head);
    }
};
// 统一处理请求错误 401 问题
config.ProcessError = function(error,callback){
    if(error.status === 401 && error.responseJSON.code === 1){
        $.tips('header请求错误，将重新请求');
        callback && callback();
        $.refreshToken(function(){
            window.location.reload();
        })
    }
};
// 列表页加载，每页加载条数
config.pagesize = 10;