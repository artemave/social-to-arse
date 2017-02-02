var http = require('http');
var fs = require('fs');
var path = require('path');

var replacements = fs.readFileSync('./replacements.json')
var port = process.env.PORT || 1337

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  response.end(replacements, 'utf-8');
}).listen(port)

console.log("http://localhost:" + port)
