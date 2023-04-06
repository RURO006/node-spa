var https = require('https');
var express = require('express');
var fs = require('fs');
var url = require('url');
var path = require('path');
var app = express();
var fileDir = 'wwwroot';
var port = 8080;

const options = {
    key: fs.readFileSync('key/server.key'),
    cert: fs.readFileSync('key/server.crt'),
};

//#region  讀取本地檔案
app.all('*.(mp4|mp3|js|css|ttf|svg|png|jpg|jpeg|ico|woff2|woff|txt|html|webmanifest)', function (req, res) {
    // 轉址檔案路徑到wwwroot
    var parsed = url.parse(req.url);
    var fileName = path.basename(parsed.pathname);
    filePath = __dirname + '/wwwroot/' + fileName;
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.statusCode = 404;
        res.write('404 sorry not found');
        res.end();
    }
});
function replaceMetaAndSend(res) {
    fs.readFile(fileDir + '/index.html', 'utf8', (err, data) => {
        if (err) {
            console.log('error:', err); // Print the error if one occurred
            res.status(500).send();
        } else {
            res.status(200).send(data);
        }
    });
}
//#endregion

app.get('/*', function (req, res) {
    console.log(`path:${req.method} ${req.url}`);
    replaceMetaAndSend(res);
});

module.exports = app;

https.createServer(options, app).listen(port);
console.log('start!!');
console.log(`https://localhost:${port}`);
