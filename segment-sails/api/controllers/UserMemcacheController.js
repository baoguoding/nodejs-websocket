var nMemcached = require('memcached');

function formatDate(date) {
    return date.toLocaleDateString()+' '+date.toLocaleTimeString();
}
module.exports = {
    zhuce: function (req, res) {
        memcached = new nMemcached("127.0.0.1:11211" );
        memcached.set("hello",'quqiufeng@gmail.com' , 0, function( err, result ){
            if( err ) console.error( err );
            console.log( result );
            res.send(result);
            memcached.end();
        });

    },
    login: function (req, res) {
        memcached = new nMemcached("127.0.0.1:11211" );
        memcached.get("hello", function( err, result ){
            if( err ) console.error( err );
            console.log(result );
            res.send(result);
            memcached.end();
        });
    }
};
