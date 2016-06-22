'use strict'

const fs = require("fs");

module.exports = {
    readLocalFileFromRequest: readLocalFileFromRequest,
}

/**
 * 
 */
function readLocalFileFromRequest(req, res) {
    let fileDetails = getFileDetails(req);
    
    if (!fileDetails) return false;
    
    let fileContents = fs.readFileSync(fileDetails.fullPath);
    
    return fileContents;
    
}

/**
 * TODO: REFACTOR TO USE FILEDESCRIPTORS
 */
function getFileDetails(req) {
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
    
    let directoryPath = tokens.splice(-1, 1).join("/");
    
    let dir = fs.statSync(directoryPath);
    if (!dir.isDirectory()) return null;
    
    let fileNamesInDir = fs.readdirSync(directoryPath);
    
    let fullPath = null;
    
    
    for (let dirFileName of fileNamesInDir) {
        if (dirFileName.split(".")[0] === fileName) fullPath = directoryPath + dirFileName;
    }
    
    if (!fullPath) {
        return null;
    } else {
        return {
            fullPath: fullPath
        }
    }
}