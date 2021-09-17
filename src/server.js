// Alright this is the first proj coding from scratch in this class,
// so there will be a fair bit of copying over from earlier assignments
const http = require('http');// basic http stuff we need
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// set up our port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Okay we're going to want to have our url parse object here with references to differnt functions
// indexed by the url it takes to reach them. No need to consider HEAD or POST or such yet.
const urlStruct = {
    '/': htmlHandler.getPage,
    '/success' : jsonHandler.success, //will later have a way to figure out json vs ajax
    //'/badRequest' : //function call for bad request page
    //'/unauthorized' : //function call for unauthorized page
    //'/forbidden' : //function call for forbidden page
    //'/internal' : //function call for internal page
    //'/notImplemented' : //function call for not implemented page
    '/style.css' : htmlHandler.getCSS,
    //other : //function call for the anything else 
};

// here's the function that actually handles the stuff
const onRequest = (request, response) => {
  console.log(request.url);// mostly for tracking and debugging

  //so here's where we actually use/parse the url!
  if (urlStruct[request.url]) {
    urlStruct[request.url](request, response);
  }// else send the default error function
};

// and here's where we set up the server!!!
http.createServer(onRequest).listen(port);

// and a final console log, again largely for like debugging n stuff
console.log(`Listening on 127.0.0.0:${port}`);
