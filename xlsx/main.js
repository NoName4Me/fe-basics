var srcData, templateData;
document.querySelector("#srcFile").onchange = function(event) {
    console.log(event);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(re) {
        // The file's text will be printed here
        console.log(re)
        srcData = re.target.result;

    };
    reader.readAsBinaryString(file);
}

function ok() {
    if(!srcData || !templateData) {
        alert("check your "+ (srcData ? "template" : (templateData ? "data":"data and template") + " file!"));
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