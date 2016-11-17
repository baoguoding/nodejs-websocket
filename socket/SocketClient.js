var net = require('net');
var ProtoBuf = require("protobufjs");
var User = require('./userproto.js')['protobuf']['User'];

var port = 9000;
var host = '127.0.0.1';

var client= new net.Socket();
//client.setEncoding('UTF-8');
//client.setEncoding('binary');

var user = new User({});

//连接到服务端
client.connect(port,host,function(){
    user.uid=121;
    user.uname='张三';
    user.pwd='mima';
    var buffer = user.encode().toBuffer();//编码
    client.write(buffer);
    say();
});

client.on('data',function(data){
    console.log('服务端传来:'+ data);
    var userbuf = User.decode(data);
    console.log('uname:'+userbuf.uname);
    say();
});
client.on('error',function(error){
    console.log('error:'+error);
    //client.destory();

});
client.on('close',function(){
    console.log('Connection closed');
});

//--------------输入:------------------------
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function say(){
    rl.question('请输入： ', (inputStr) => {
        if(inputStr!='bye'){
        user.uname=inputStr;
        var buffer = user.encode().toBuffer();//编码
        client.write(buffer);
        //client.write(inputStr+'\n');
        //say();
    }else{
        client.destroy();     //关闭连接
        rl.close();
    }
});
}