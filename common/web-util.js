//Import Library
const urlLib = require('url');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile)
const ROOT = process.cwd();
//
function buildResponse(content, status = 200, headers = {}) {
    return { content, status, headers }
}


function chooseHandler(handlerMap, method, url) {
    const pathname = urlLib.parse(url).pathname;
    const route = `${method} ${pathname}`;
    //const handler = handlerMap[route];
    for (let [pattern, handler] of handlerMap.entries()) {
        if (route.match(pattern)) {
            return handler;
        }
    }
}

//Create absolute to public file
function buildPublicPath(filename) {
    return path.join(ROOT, 'views', filename);
}

function buildViewPath(filename) {
    return path.join(ROOT, 'views', filename);
}

function loadHtml(filename) {
    return readFileAsync(buildPublicPath(filename), '')
}

module.exports = {
    chooseHandler,
    buildPublicPath,
    buildViewPath,
    buildResponse,
    loadHtml,
}