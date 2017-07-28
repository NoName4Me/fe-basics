var srcData, templateData;
document.querySelector("#srcFile").onchange = function(event) {
    //console.log(event);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(re) {
        // The file's text will be printed here
        //console.log(re)
        srcData = re.target.result;
        $http.post("./send", JSON.stringify({
                type: 'src',
                data: srcData
            }))
            .then(JSON.parse)
            .then((r) => {
                console.log(r);
            })
            .catch(function(error) {
                console.error(error);
            });
    };
    reader.readAsBinaryString(file);
}

function ok() {
    if (!srcData || !templateData) {
        alert("check your " + (srcData ? "template" : (templateData ? "data" : "data and template") + " file!"));
    }
    try {
        var workbook = XLSX.read(srcData, {
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
}

var $http = {
    basic: function(url, method, headers, data) {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();
            req.open(method, url);
            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                } else {
                    reject(new Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(new Error("Network error"));
            };

            req.send(data);
        });
    },
    get: function(url) {
        return $http.basic(url, 'GET');
    },
    post: function(url, data) {
        return $http.basic(url, 'POST', undefined, data);
    }
};