/**
 * Created by paiwanga on 2016/12/1.
 */
var express = require("express");
var parseFS = require('./modules/parseFS');
var parseXlsx = require('./modules/parse_xlsx');
var multer = require("multer");

var app = express();


app.use(express.static("../kingpai_servers_node_public/public"));

app.listen(80);

parseFS(app);
parseXlsx(app);

app.get('*', function (req, res) {
    res.sendStatus(404);
});

console.log("start wwwnode");