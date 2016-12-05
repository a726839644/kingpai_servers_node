/**
 * Created by paiwanga on 2016/12/1.
 */
var xlsx = require("node-xlsx");
var fs = require("fs");
var multer = require("multer");

function parseFS(app) {
    app.use(multer({dest: 'uploads/xlsx/'}).array("statements"));
    app.post("/statements_parse_action", function (req, res) {
        var file = req.files[0];
        fs.rename(file.path, file.path + ".xlsx", function () {
            file.path += ".xlsx";
            var data = parse(file.path, function () {
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            });
            res.end(JSON.stringify(data));
        });
    });
    console.log("start parseFS");
}

function parse(addr, callback) {
    var obj = xlsx.parse(addr);
    var statements = {};
    statements.length = 0;
    for (var i = 0; i < obj.length; i++) {
        var name = obj[i].name;
        if (name.indexOf("资产负债表") != -1 || name.indexOf("利润表") != -1) {
            statements[name] = obj[i];
            statements.length++;
        }
    }
    callback();
    return statements;
}

module.exports = parseFS;