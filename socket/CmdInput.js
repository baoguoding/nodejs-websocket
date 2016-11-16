//----------------------------------------------------------
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function say(){
    rl.question('请输入： ', (inputStr) => {
        if(inputStr!='bye'){
        //client.write(inputStr+'\n');
        say();
    }else{
        //client.destroy();     //关闭连接
        rl.close();
    }
});
}

say();