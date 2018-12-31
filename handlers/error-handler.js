// Import Library
const fs = require("fs");
const util = require("util");

// Create method read file
const readFileAsync = util.promisify(fs.readFile);

// Destructuring ES6
const { errServer } = require("../models/ServerSideError");

//Create module for error Route
exports.onErrorRoute = async function(err) {
  console.error("Route error: ", err);

    const html = await readFileAsync('views/error.html', 'utf-8');
    const errMsg = err instanceof errServer
        ? err.message : "";
    const content = html.replace('{{resson}}'.errMsg);
    return content;
};

