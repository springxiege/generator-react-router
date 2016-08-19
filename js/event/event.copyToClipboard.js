/**
 * [copyToClipboard 复制文字]
 * @param  {[type]} txt [description]
 * @return {[type]}     [description]
 */
export default function copyToClipboard(txt) {  
    console.log('copy')
    console.log('out->'+txt);
    console.log(window.copy)
    console.log(window)
    if (window.clipboardData) {  
        window.clipboardData.clearData();  
        window.clipboardData.setData("Text", txt);  
        $.tips("复制成功！")  
    } else if (window.navigator.userAgent.indexOf("Opera") != -1) {  
        window.location = txt;  
        $.tips("复制成功！");  
    } else if (window.netscape) {  
        try {  
            window.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
        } catch (e) {  
            $.tips("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");  
        }  
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
        if (!clip)  
            return;  
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
        if (!trans)  
            return;  
        trans.addDataFlavor('text/unicode');  
        var str = new Object();  
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
        var copytext = txt;  
        str.data = copytext;  
        trans.setTransferData("text/unicode", str, copytext.length * 2);  
        var clipid = Components.interfaces.nsIClipboard;  
        if (!clip)  
            return false;  
        clip.setData(trans, null, clipid.kGlobalClipboard);  
        $.tips("复制成功！")  
    }else if(window.copy){  
        console.log("copy-in");
        console.log(txt)
        window.copy(txt);  
        $.tips("复制成功！")  
    }  else{
        console.log("copy-in2");
        console.log(txt)
        window.copy(txt);  
        $.tips("复制成功！") 
    }
    console.log('copy finished')
}