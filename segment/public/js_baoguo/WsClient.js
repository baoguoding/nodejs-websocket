var ws = new WebSocket("ws://127.0.0.1:9000/");
ws.onopen = function() {
    //alert("Opened");
//    ws.send("I'm client");
    ws.send(buffer);
};

//服务端传来的消息
ws.onmessage = function (evt) {
    //alert(evt.data);
    var chatroom = document.getElementById('chatroom');
    chatroom.innerHTML += '<br/>' +evt.data;
};

//服务端关闭
ws.onclose = function() {
    //alert("Closed");
};

ws.onerror = function(err) {
   // alert("Error: " + err);
};