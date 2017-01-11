/**
 * Created by paiwanga on 2017-01-03.
 */
var xlsx = require("node-xlsx");
var fs = require("fs");
var multer = require("multer");
var upload = multer({dest: 'uploads/xlsx/'}).array("xlsx", 1);

function parse_xlsx(app) {
    app.post("/parse_xlsx", upload, function (req, res) {
        var file = req.files[0];
        fs.rename(file.path, file.path + ".xlsx", function () {
            file.path += ".xlsx";
            var data = parse(file.path, function () {
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                })
            });
            res.end(JSON.stringify(data));
        });
    });
    console.log("start parse_xlsx");
}

function parse(addr, callback) {
    var obj = xlsx.parse(addr);
    callback();
    return obj;
}

module.exports = parse_xlsx;