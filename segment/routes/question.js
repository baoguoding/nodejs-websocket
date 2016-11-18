var express = require("express");
var router = express.Router();
var checkSession = require("../jsbean/CheckSession");
var questionModel = require("../models/QuestionModel");

router.all('/ask', function(req, res) {
    loginbean = checkSession.check(req,res);
    if(!loginbean){
        return;
    }
    subflag = req.body['subflag'];
    if(subflag==undefined){
        res.render('ask', {loginbean: loginbean});
    }else{
        //发提问
        questionModel.ask(req,res);
    }
})

router.get('/detail', function(req, res) {
    questionModel.queDetail(req,res);
})

router.post('/reply', function(req, res) {
    questionModel.reply(req,res);
})

module.exports = router;