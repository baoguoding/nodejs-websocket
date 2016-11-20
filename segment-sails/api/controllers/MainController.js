/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

QuestionController = require("./QuestionController");
SphinxClient = require ("sphinxapi");
util = require('util');
assert = require('assert');

module.exports = {



    /**
     * `MainController.index()`
     */
    index: function (req, res) {
        loginbean = req.session.loginbean;
        //console.log(loginbean);
        QuestionController.queList(req, res);
        //res.view('index',{loginbean:loginbean});
    },
    logout:function(req,res){
        req.session.destroy(function(err) {
            res.redirect('/');
        })
    },
    test:function(req,res){
        res.send("我是test页面");
    },
    search:function(req,res){
        var cl = new SphinxClient();
        cl.SetServer('localhost', 9312);

        cl.Status(function(err, result) {
            //assert.ifError(err);
            //console.log(util.inspect(result, false, null, true));
        })

        var keyword = req.query['keyword'];
        //----- 分页----------
        page = 1;
        if(req.query['page']!=undefined){
            page = parseInt(req.query['page']);
            if(page<1){
                page=1;
            }
        }
        pageSize = 2;
        pointStart = (page-1)*pageSize;
        count=0;
        countPage=0;

        //----- 分页----------
        cl.SetLimits(pointStart, pageSize);
        cl.Query(keyword,'question',function(err, result) {
            if(result!=null){
                req.matches=result['matches'];
                req.total = result['total'];              //总共查出多少条
                req.page = page;
                countPage = Math.ceil(req.total/pageSize);
                req.countPage=countPage;

                QuestionController.search(req,res);
            }else{
                res.redirect("/");
            }
        } );
    },
    sioclient:function(req, res){
        res.view('socketIoClient');

    }
};

