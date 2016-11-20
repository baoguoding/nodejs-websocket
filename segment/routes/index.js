var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var questionModel = require('../models/QuestionModel')

/* GET home page. */
router.get('/', function(req, res, next) {
    loginbean = req.session.loginbean;
    if(loginbean !== undefined){
        console.log("loginbean:"+loginbean);
        console.log(loginbean.nicheng);
    }

    questionModel.queList(req,res,loginbean);

    //res.render('index', {loginbean:loginbean});
});

//----注销session
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        //res.send("location.href='/index';");
        res.redirect('/');
    })
});

//-----图片上传
router.post('/uploadImg',function(req,res){
    var form = new multiparty.Form();
    //设置编码
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./uploadtemp/";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
        uploadurl='/images/upload/'
        file1 = files['filedata'];
        //paraname = file1[0].fieldName;  //参数名filedata
        originalFilename = file1[0].originalFilename; //原始文件名
        tmpPath = file1[0].path;//uploads\mrecQCv2cGlZbj-UMjNyw_Bz.txt
        //fileSize = file1[0].size; //文件大小

        var timestamp=new Date().getTime(); //获取当前时间戳
        uploadurl += timestamp+originalFilename
        newPath= './public'+uploadurl;

        var fileReadStream = fs.createReadStream(tmpPath);
        var fileWriteStream = fs.createWriteStream(newPath);
        fileReadStream.pipe(fileWriteStream); //管道流
        fileWriteStream.on('close',function(){
            fs.unlinkSync(tmpPath);    //删除临时文件夹中的图片
            console.log('copy over');
            res.send('{"err":"","msg":"'+uploadurl+'"}')
        });
    });
    //-----------------------------------------
    //res.send('上传');


});

router.get('/wsclient',function(req, res){
    res.render('WsClient');
});

module.exports = router;


//-----------------------------启动9000服务器
var WebSocketServer = require('ws').Server
var ProtoBuf = require("protobufjs");
var User = require('../public/userproto.js')['protobuf']['User'];

wss = new WebSocketServer({port: 9000});

var clientMap = new Object();
var ii=0;
wss.on('connection', function(ws) {
    console.log(ws+'上线');
    ws.name=++ii;
    clientMap[++ii] = ws;
    ws.on('message', function(message) {
        console.log('received: %s', message);
        var userbuf = User.decode(message);
        console.log(userbuf.uname);
        broadcast(message,ws);
    });
    ws.on('close', function(){
        //  global.gc();    //调用内存回收
        delete clientMap[ws.name];
        console.log("leave");
    });
});

function broadcast(msg, socket){
    for(var key in clientMap){
        clientMap[key].send( msg);
    }
}

console.log("WsServer startd at port 9000");
