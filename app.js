//Import node lib
const http = require("http");
const { Stream } = require("stream");

//Import handlers through Object Destructuring
const { onErrorRoute } = require("./handlers/error-handler");
const listRoute = require("./handlers/list-route-handler");
const chooseHandlers = require("./common/web-util");
const static = require("./handlers/static-handler");

//Catch Final Error -> return if crashed
const onUnhandlerError = err => {
  console.error("Unhandled error: ", err);
  process.exit();
};

// Catch all unhandled exception
process.on("uncaughtException", onUnhandlerError);

// Catch all unhandled promise rejection
process.on("unhandledRejection", onUnhandlerError);

// using regular expression 
const HANDLERS = new Map();
HANDLERS.set(/^GET \/$/, listRoute.onDefaultRoute);
// HANDLERS.set(/^GET \/static\/[-w\.]*/, static.onAsyncRoute);
HANDLERS.set("GET /static/", static.onAsyncRoute);

//Create Request to Server
const requestListener = async (req, res) => {
  const handler = chooseHandlers.chooseHandler(HANDLERS, req.method, req.url);
  if (!handler) { res.writeHead(404);
    return res.end();
  }
  res.on("error", onUnhandlerError);
  let response = "";
    try { response = await handler(req); }
    catch (err) { response = await onErrorRoute(err); }
    finally { const headers = Object.assign(
      { "Content-Type": "text/html" },
      response.headers
    );
    res.writeHead(response.status, headers);
    const { content } = response;
      if (content instanceof Stream) { res.pipe(content); }
      else { res.end(content); }
  }
};
///Create Server
http
  .createServer()
  .on("request", requestListener)
  .on("listening", () => {
    console.log("Server is listening at port 4000");
  })
  .on("error", err => {
    console.error("Web server is error", err);
  })
  .listen(4000);
