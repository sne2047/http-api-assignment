const fs = require('fs'); // need the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/css'});
    response.write(css);
    response.end();
}

module.exports.getPage = getPage;
module.exports.getCSS = getCSS;