/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

User = require('../models/User');
var LoginBean = require("../jsbean/LoginBean");

function formatDate(date) {
    return date.toLocaleDateString()+' '+date.toLocaleTimeString();
}

module.exports = {
    insertUser:function(user){
        user.createtime=formatDate(new Date());
        User.create(user).exec(function (err,created){
            console.log(err);
            //console.log(created);     //返回的是创建的对象
        })

        /*
         User.create({email:'ee',pwd:'ee',nicheng:'ee',createtime:formatDate(new Date()) }).exec(function (err,created){
         console.log(err);
         console.log(created);     //返回的是创建的对象
         })

         User.query('insert into user set email=?,pwd=?,nicheng=?,createtime=current_timestamp',['gg','gg','gg'],function(err,results){
         console.log('错误:'+err);
         console.log(results);
         })
         */
    },
    updUser:function(){
        User.update({uid:1},{nicheng:'eee'}).exec(function (err,updated){
            if (err) {
                console.log('出错:'+err)
            }else{
                //console.log(updated)
            }
        });
    },
    /**
     * `UsersController.zhuce()`
     */
    zhuce: function (req, res) {
        var user = req.allParams();
        user.createtime=formatDate(new Date());
        User.create(user).exec(function (err,created){
            if(err){
                var errStr = err.message;
                //console.log(errStr);
                if(errStr.indexOf('emailuniq')>-1){
                    res.send('<script>alert("email重复");history.back();</script>');
                }else if(errStr.indexOf('nichenguiq')>-1){
                    res.send('<script>alert("昵称重复");history.back();</script>');
                }
                return;
            }
            res.redirect(307,'/users/login');
            //res.send("注册成功");
        })

    },


    /**
     * `UsersController.login()`
     */
    login: function (req, res) {
        if(req.body==undefined){
            res.view();
        }else{
            User.query('select uid,nicheng from user where email=? and pwd=?',[req.body['email'],req.body['pwd']],function(err,rs){
                //console.log('错误:'+err);
                //console.log(rs);
                if(rs.length>0){
                    loginbean = new LoginBean();
                    loginbean.id=rs[0].uid;
                    loginbean.nicheng = rs[0].nicheng;
                    req.session.loginbean = loginbean;
                    //res.redirect('/');
                    res.redirect(req.body["targeturl"]);
                }else{
                    res.send('<script>alert("email/密码错误");history.back();</script>');
                }
            })
            /*
             User.find({email:req.body['email'],pwd:req.body['pwd']}).exec(function (err,rs){
             console.log(err);
             console.log(rs);
             });
             */
            //res.send('登录');
        }
    },



    //----------删除----------------
    delUser:function(req,res){
        User.query('delete from user where id=?',[1],function(err,rs){
            console.log(rs);
        })
        res.send('ok');
    }
};

