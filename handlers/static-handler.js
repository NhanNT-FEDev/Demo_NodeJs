//import node lib
const path = require("path");
// const util = require("util");
const fs = require('fs');
const static = require('../common/web-util')

// import own lib
const buildPublicPath = require("../common/web-util");

//TYPES 
const PLAYERTYPES = new Map()
PLAYERTYPES.set('.css', 'text/css');
PLAYERTYPES.set('.png', 'image/jpeg');
PLAYERTYPES.set('.ttf', 'font/ttf');

const sanitizePath = function(url) {
  const destUrl = url.replace(/^\/static/, "");
  const normalPath = path.normalize(destUrl);
  const safePath = normalPath.replace(/^(\.\.[\/\\])+/, "");
  return {
    fileExt: path.extname(safePath),
    filePath: buildPublicPath.buildPublicPath(safePath)
  };
};

const onAsyncRoute = function (req) {
    const { fileExt, filePath } = sanitizePath(req.url);

    if (!PLAYERTYPES.has(fileExt)) {
        return Promise.resolve(static.buildResponse('File type not supported', 400));
    }

    const headers = {
        'Content-Type': PLAYERTYPES.get(fileExt)
    }

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                return resolve(static.buildResponse(null, 404));
            }
            resolve(static.buildResponse(data,200, headers))
        })
    })
}

module.exports = {
    sanitizePath, 
    onAsyncRoute,
}