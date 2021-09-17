//mimicking https://github.com/IGM-RichMedia-at-RIT/status-code-example/blob/master/src/jsonResponses.js
//main response thing, handling the actual sending out of the JSON
const respondJSON = (reqeust, response, status, object) => {
    response.writeHead(status, {'Content-Type':'application/json'});
    response.write(JSON.stringify(object));
    response.end();
}

const success = (request, response) => {
    const responseJSON = {
        message : 'This is a successful response',
    };

    respondJSON(request, response, 200, responseJSON);
};

module.exports.success = success;