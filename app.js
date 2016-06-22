'use strict'

let localFileService = require("./services/localFileService.js"),
    remoteProxyService = require("./services/remoteProxyService.js"),
    http = require('http');



/**
 * Logic on server:
 * 1.- Check if a mock file exists
 * 2.- Check if first URL directory is mapped through properties to any domain and proxy it.
 * 3.- Proxy URL to default proxy URL
 */
var server = http.createServer(function(req, res) {
    /*let localFile = localFileService.readLocalFileFromRequest(req, res);
    
    if (localFile) {
        res.write(localFile);
    }*/
    
    remoteProxyService.proxyToRemoteServer(req, res);
    
});

console.log("listening on port 5050");
server.listen(5050);