// mimicking https://github.com/IGM-RichMedia-at-RIT/status-code-example/blob/master/src/jsonResponses.js
// main response thing, handling the actual sending out of the JSON

const dataFormat = (type, content) => {
  if (type === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    if (content.id) {
      responseXML = `${responseXML} <id>${content.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;
    return responseXML;
  }

  return JSON.stringify(content);
};

const respond = (request, response, status, content, type) => {
  // set status code and content type
  response.writeHead(status, { 'Content-Type': type });
  // write the thing to response
  response.write(content);
  // aaaand send it!
  response.end();
};

const success = (request, response, params, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, dataFormat(type, responseJSON), type);
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'Correct query paramaters provided',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, dataFormat(type, responseJSON), type);
  }

  // else we'll return a success
  return respond(request, response, 200, dataFormat(type, responseJSON), type);
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'Correct query parameters provided',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, dataFormat(type, responseJSON), type);
  }

  // else we'll return a success
  return respond(request, response, 200, dataFormat(type, responseJSON), type);
};

const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return respond(request, response, 403, dataFormat(type, responseJSON), type);
};

const internal = (request, response, params, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  return respond(request, response, 500, dataFormat(type, responseJSON), type);
};

const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respond(request, response, 501, dataFormat(type, responseJSON), type);
};

const notFound = (request, response, params, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respond(request, response, 404, dataFormat(type, responseJSON), type);
};
module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
