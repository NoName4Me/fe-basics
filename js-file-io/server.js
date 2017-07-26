const http = require("http");
const fs = require('fs');
const url = require('url');

exports.start = function() {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        var ext = pathname.match(/(\.[^.]+|)$/)[0];
        if (['.css', '.html', '.js', '.png'].indexOf(ext) < 0) {
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            response.write("not support '" + ext + "' format!");
            response.end();
        } else {
            fs.readFile("." + request.url, ext === '.png' ? null : 'utf-8', function(err, data) {
                if (err) {
                    throw err;
                };
                response.writeHead(200, {
                    "Content-Type": {
                        ".css": "text/css",
                        ".js": "application/javascript",
                        ".html": "text/html",
                        ".png": "image/png"
                    }[ext]
                });
                response.write(data);
                response.end();
            });
        }

    }).listen(8888);
};