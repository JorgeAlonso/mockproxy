'use strict'

const fs = require("fs"),
    mime = require("mime"),
    config = require("../config.js");

module.exports = {
    readLocalFileFromRequest: readLocalFileFromRequest,
}

/**
 * TODO: REFACTOR TO USE FILEDESCRIPTORS
 */
function readLocalFileFromRequest(req, res) {
    let method = req.method;
    
    let tokens = req.url.split("/");
    let fileName = tokens[tokens.length -1];
    
    switch (method) {
        case "GET":
            //NOTHING TO DO HERE?
        break;
        
        case "POST":
            //TODO: Get body, MD5 HASH and append to fileName.
        break;
    }
    
    //Remove filename
    tokens.splice(-1, 1);
    
    let subdirectory = tokens.join("/");
    
    let directoryPath = "./"+subdirectory;
    if (config.mockdir) {
        directoryPath = "./"+config.mockdir+"/"+subdirectory;
    }
    
    let dir;
    try {
        dir = fs.statSync(directoryPath);
    } catch (err) {
        return false;
    }
    if (!dir.isDirectory()) return false;
    
    let fileNamesInDir = fs.readdirSync(directoryPath);
    
    let fullPath = null;
    
    
    for (let dirFileName of fileNamesInDir) {
        if (dirFileName.split(".")[0] === fileName) fullPath = directoryPath + "/" + dirFileName;
    }
    
    if (!fullPath) {
        return false;
    } else {
        let fileContents = fs.readFileSync(fullPath);
        let contentType = mime.lookup(fullPath);
        res.setHeader('content-type', contentType);
        res.write(fileContents);
        res.end();
        return true;
    }
}