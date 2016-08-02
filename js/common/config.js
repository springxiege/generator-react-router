
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
}