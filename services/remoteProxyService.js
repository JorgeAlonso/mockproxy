'use strict'

const httpProxy = require('http-proxy'),
    config = require("../config.js"),
    urlUtils = require("../utils/urlUtils.js"),
    https = require("https");


//Create server    
const proxy = httpProxy.createProxyServer({
    agent: new https.Agent({
        rejectUnauthorized: false
    })

});

// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong!! '+JSON.stringify(err));
});

// Listen for the `proxyReq ` event on `proxy`.
proxy.on('proxyReq', function (proxyReq, req, res) {
  proxyReq.setHeader('Host', req._hostToProxy);
  console.log("Requesting "+proxyReq.__inspector_url__);
});


/**
 * 
 */
function proxyToRemoteServer(req, res) {
    
    let tokens = req.url.split("/");
    let serverToProxyCode = tokens[1];
    
    let serverToProxyDetails = config.routes[serverToProxyCode];
     
    if (serverToProxyDetails) {
        //Remove first part of URL to proper proxy
        tokens.splice(1, 1);
        let newUrl = tokens.join("/");
        req.url = newUrl;
      
    } else {
        serverToProxyDetails = config.routes.default;
    }
    
    let serverToProxyUrl = urlUtils.getFullUrlFromConfigObject(serverToProxyDetails);
    
    req._hostToProxy = serverToProxyDetails.host;

    let proxyOptions = {
        target: serverToProxyUrl
    };

    if (serverToProxyUrl.startsWith("https")) proxyOptions.secure = true;
      
    proxy.web(req, res, proxyOptions);
}


module.exports = {
    proxyToRemoteServer: proxyToRemoteServer
}

