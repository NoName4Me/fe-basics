const http = require("http");
const fs = require('fs');
const url = require('url');
const XLSX = require('xlsx');

exports.start = function() {
    http.createServer(function(request, response) {
        if (request.method === 'GET') {
            var pathname = url.parse(request.url).pathname;
            var ext = pathname.match(/(\.[^.]+|)$/)[0];
            if (['.css', '.html', '.js', '.png'].indexOf(ext) < 0) {
                response.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                response.write(JSON.stringify({
                    errorCode: 1001,
                    msg: "not support '" + ext + "' format!"
                }));
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
        } else {
            console.log('get a post: ', request.url);
            let body = [];
            request.on('error', (err) => {
                console.error(err);
            }).on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                // At this point, we have the headers, method, url and body, and can now
                // do whatever we need to in order to respond to this request.
                try {
                    var workbook = XLSX.read(JSON.parse(body).data, {
                        type: 'binary'
                    });
                    var fromTo = '';

                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            console.log(fromTo);
                            var allData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                            break; // 如果只取第一张表，就取消注释这行
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return;
                }
            });
        }


    }).listen(8888);
};