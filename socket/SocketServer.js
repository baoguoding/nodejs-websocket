var net = require('net');
var chatServer = net.createServer(), //创建一个服务端
clientMap=new Object();

var ii=0; //连接名称的流水号
chatServer.on('connection', function(client) {
    console.log("有人连接上来了。");
    // JS 可以为对象自由添加属性。这里我们添加一个 name 的自定义属性，用于表示哪个客户端（客户端的地址+端口为依据）
    client.name=++ii;
    clientMap[client.name]=client;
    //client.setEncoding('utf-8');
    //超时事件
//    client.setTimeout(timeout,function(){
//        console.log('连接超时');
//        client.end();
//    });

    client.on('data', function(data) {
        console.log('客户端传来:'+data);
        //client.write('你发来:'+data);
        broadcast(data, client);// 接受来自客户端的信息
    });
    //数据错误事件
    client.on('error',function(exception){
        console.log('client error:' + exception);
        client.end();
    });
    //客户端关闭事件
    client.on('close',function(data){
        delete clientMap[client.name];
        console.log(client.name+'下线了');
        broadcast(client.name+'下线了',client);

    });

});
function broadcast(message, client) {
    for(var key in clientMap){
        clientMap[key].write(client.name+'say:'+message+'\n');
    }
}
chatServer.listen(9000);