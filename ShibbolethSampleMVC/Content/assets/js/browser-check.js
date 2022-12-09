function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
navigator.browserSpecs = (function(){
    var ua = navigator.userAgent, tem, 
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1] || '')};
    }
    if(M[1]=== 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
    }
    M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!= null)
        M.splice(1, 1, tem[1]);
    return {name:M[0], version:M[1]};
})();

function is_okbrowser() {
    if(isMobile()){
        return true;
    }
    var name = navigator.browserSpecs.name;
    var version = navigator.browserSpecs.version;
    var goodversion = {
        chrome:78,
        firefox:70,
        edge:44,
        safari:12,
        ie:11,
        // opera:64,
    }
    // console.log("version: " + goodversion.chrome);

    if(name == 'Chrome') {
        if(version < goodversion.chrome) {
            return false;  
        }
    }
    else if (name == 'Firefox') {
        if(version < goodversion.firefox) {
            return false;  
        }
    } 
    else if (name == 'Safari') {
        if(version < goodversion.safari) {
            return false;  
        }
    }
    else if (name == 'Edge') {
        if(version < goodversion.edge) {
            return false;  
        }
    }
    else if (name == 'IE') {
        if(version < goodversion.ie) {
            return false;  
        }
    }
    // else if (name == 'Opera') {
    //     return true;
    // }

    //logging version
    console.log(JSON.stringify(navigator.browserSpecs));
    return true;

}


// document.getElementById("maincontent").innerHTML = JSON.stringify(navigator.browserSpecs);
// document.getElementById("output").innerHTML += "<br/>" + "is mobile?: " + isMobile();

