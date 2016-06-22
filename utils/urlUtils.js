'use strict'

function getFullUrlFromConfigObject(object) {
    if (object && object.host && object.port && object.protocol) {
        let url = object.protocol + "://"+ object.host+":"+object.port;
        if (object.suburl) {
            url += "/"+object.suburl;
        }
        
        return url;
    }
    
    return null;   
}

module.exports = {
    getFullUrlFromConfigObject: getFullUrlFromConfigObject
}