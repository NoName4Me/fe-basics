document.querySelector("#srcFile").onchange = function(event) {
    console.log(event);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(re) {
        // The file's text will be printed here
        console.log(re)
        try {
            var data = re.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                });
                var fromTo = '';

                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        console.log(fromTo);
                        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break; // 如果只取第一张表，就取消注释这行
                    }
                }
        } catch (error) {
            console.log('文件类型不正确');
            return;
        }

    };

    reader.readAsBinaryString(file);


}