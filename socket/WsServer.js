var WebSocketServer = require('ws').Server
wss = new WebSocketServer({port: 9000});

var clientMap = new Object();
var ii=0;
wss.on('connection', function(ws) {
    console.log(ws+'上线');
    ws.name=++ii;
    clientMap[++ii] = ws;
    ws.on('message', function(message) {
        console.log('received: %s', message);
        broadcast(message,ws);
    });
    ws.on('close', function(){
        global.gc();    //调用内存回收
        console.log("leave");
    });
});

function broadcast(msg, socket){
    for(var key in clientMap){
        clientMap[key].send(socket.name + "说:" + msg);
    }
}
