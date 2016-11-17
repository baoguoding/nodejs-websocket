var fs = require("fs");
ProtoBuf = require("protobufjs");
userProtoStr = fs.readFileSync('./user.proto').toString();

User = ProtoBuf.loadProto(userProtoStr).build('protobuf').User;

user= new User();
user.set('uid', 111);
user.set('uname', '123456');
user.set('pwd', 'aabbcc');

//------------编码----------------
var buffer = user.encode().toBuffer();
console.log("buffer: "+buffer);

//------------解码----------------

var userInfo = User.decode(buffer);

console.log(userInfo.get('uname'));