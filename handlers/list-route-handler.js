// Import lib
const fs = require("fs");
const util = require("util");
const { loadHtml } = require("../common/web-util");
const webUtil = require('../common/web-util');

// Default route.
const onDefaultRoute = async function(req, res) {
  const html = await loadHtml('home.html');
  return webUtil.buildResponse(html);
};

// Create map module for route
module.exports = {
  onDefaultRoute
};
