var WebSocketServer = require('ws').Server
var ProtoBuf = require("protobufjs");
var User = require('./userproto.js')['protobuf']['User'];

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
        global.gc();    //调用内存回收
        console.log("leave");
    });
});

function broadcast(msg, socket){
    for(var key in clientMap){
        clientMap[key].send( msg);
    }
}

console.log("WsServer startd at port 9000");
