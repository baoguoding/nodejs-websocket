var ws = new WebSocket("ws://192.168.31.243:9000/");
ws.onopen = function() {
    //alert("Opened");
//    ws.send("I'm client");
    ws.send(buffer);
};

//服务端传来的消息
ws.onmessage = function (evt) {
    //alert(buffer);
    var chatroom = document.getElementById('chatroom');
    //alert(evt.data);
    var fr = new FileReader();
    fr.onload = function(){
        var ab = this.result;
        var user = UserModel.decode(ab);
        chatroom.innerHTML += '<br/>' + user.uname;
    }
    fr.readAsArrayBuffer(evt.data);
    //chatroom.innerHTML += '<br/>' +evt.data;
};

//服务端关闭
ws.onclose = function() {
    //alert("Closed");
};

ws.onerror = function(err) {
   // alert("Error: " + err);
};