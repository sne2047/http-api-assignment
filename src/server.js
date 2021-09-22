// Alright this is the first proj coding from scratch in this class,
// so there will be a fair bit of copying over from earlier assignments
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./dataResponses.js');

// set up our port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Okay we're going to want to have our url parse object here with references to differnt functions
// indexed by the url it takes to reach them. No need to consider HEAD or POST or such yet.
const urlStruct = {
  '/': htmlHandler.getPage,
  '/success': responseHandler.success, // will later have a way to figure out json vs xml
  '/badRequest': responseHandler.badRequest, // do need to figure out json vs/ xml later
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  '/style.css': htmlHandler.getCSS,
  other: responseHandler.notFound,
};

// here's the function that actually handles the stuff
const onRequest = (request, response) => {
  console.log(request.url);// mostly for tracking and debugging

  // lets get some vars to get the url params parsed out
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');
  let type = 'application/json';
  if (acceptedTypes[0] === 'text/xml') {
    type = 'text/xml';
  }

  // so here's where we actually use the url!
  if (urlStruct[request.url]) {
    urlStruct[request.url](request, response, params, type);
  } else {
    urlStruct.other(request, response, params, type);
  }
};

// and here's where we set up the server!!!
http.createServer(onRequest).listen(port);

// and a final console log, again largely for like debugging n stuff
console.log(`Listening on 127.0.0.0:${port}`);
