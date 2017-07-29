const http = require("http");
const fs = require('fs');
const url = require('url');
const XLSX = require('xlsx');
const qs = require('querystring');

exports.start = function() {
    http.createServer(function(request, response) {
        if (request.method === 'GET') {
            var pathname = url.parse(request.url).pathname;
            var ext = pathname.match(/(\.[^.]+|)$/)[0];
            if (['.css', '.html', '.js', '.png'].indexOf(ext) < 0) {
                response.writeHead(400, {
                    "Content-Type": "application/json"
                });
                response.write(JSON.stringify({
                    errorCode: 1001,
                    msg: "not support '" + ext + "' format!"
                }));
                response.end();
            } else {
                fs.readFile("." + request.url, ext === '.png' ? null : 'utf-8', function(err, data) {
                    if (err) {
                        console.error(err);
                        response.write(JSON.stringify({
                            errorCode: 5001,
                            msg: "inner error!"
                        }));
                    } else {
                        response.writeHead(200, {
                            "Content-Type": {
                                ".css": "text/css",
                                ".js": "application/javascript",
                                ".html": "text/html",
                                ".png": "image/png"
                            }[ext]
                        });
                        response.write(data);
                    }

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
                // body = qs.parse(body);
                body = JSON.parse(Buffer.concat(body).toString('utf-8'));

                var reponseData = {
                    errorCode: 0,
                    msg: "convert ok."
                };
                //read src data file
                if (body.type === "src") {
                    try {
                        var workbook = XLSX.read(body.data, {
                            type: 'binary'
                        });
                        var fromTo = '';

                        for (var sheet in workbook.Sheets) {
                            if (workbook.Sheets.hasOwnProperty(sheet)) {
                                //fromTo = workbook.Sheets[sheet]['!ref'];
                                var allData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                                console.log(allData);
                                break; // 如果只取第一张表，就取消注释这行
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        return;
                    }
                } else if (body.type = "template") {
                    var content = body.data;
                    var lines = content.split(/\r\n|\r|\n/);
                    console.log(lines)
                }
                response.write(JSON.stringify(reponseData));
                response.end();
            });
        }
    }).listen(8888);
};