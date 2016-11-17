var ProtoBuf = require("protobufjs");
var User = require('./userproto.js')['protobuf']['User'];
/*
var user = new User({
    'uid': 121,
    'uname': '你好',
    'pwd':'haha'
});*/
var user = new User({});
user.uid=121;
user.uname='张三';
user.pwd='密码';

var buffer = user.encode();//编码
console.log('buffer='+buffer);
var msgbuf = buffer.toBuffer();//加密
console.log('msgbuf='+msgbuf);

//--------解码---------------------
var userbuf = User.decode(msgbuf);
console.log(userbuf.uname);