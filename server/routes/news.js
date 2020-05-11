let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
require('./../util/util');
let User = require('./../models/user');
let News = require('./../models/news');

mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://127.0.0.1:27017/dumall',{useNewUrlParser:true});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

router.get("/newsList", function (req,res,next) {
  News.find({}).sort({'newClicks':1}).limit(9).exec(function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc 
      });
    }
  })
    
});

router.get("/newsTou", function (req,res,next) {
  News.find({},).sort({'newDate':-1}).limit(1).exec(function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc 
      });
    }
  }) 
});

router.get("/newsdetails", function (req,res,next) {
	let newId = req.param("newId");
  News.findOne({newId:newId},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{
	   	if(doc){
	   		doc.commentList.forEach((item)=>{
	   			item.zanCheck = 0;
	   		})
	   		doc.save(function (err1, doc1) {
	   			if(err1){
	          res.json({
	            status:'1',
	            msg:err1,message,
	            result:''
	          });
	        }else{
	          res.json({
	            status:'0',
	            msg:'',
	            result:doc
	          });
	        }
	   		})
	   	}
    }
  }) 
});

router.post("/zanEdit", function (req,res,next) {
	let newId = req.body.newId;
	let commentId = req.body.commentId,
			commentZan = req.body.commentZan,
			zanCheck = req.body.zanCheck;
  News.update({newId:newId, "commentList.commentId":commentId},{
  	"commentList.$.commentZan":commentZan,
  	"commentList.$.zanCheck":zanCheck,
  },function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{
	   if(zanCheck==1){
	   		let checkId = req.cookies.userId;
		   	let zan = '1';
		   	let cun = {
		   		checkId :checkId,
		   		zan : zan,
		   	};
		   	News.update({newId:newId, "commentList.commentId":commentId},{
						'$push':{"commentList.$.zanList" : cun}
		  	},function (err1,doc1){
		   		if(err1){
			      res.json({
			        status:'1',
			        msg:err1.message,
			        result:''
			      });
			   }else{
				    res.json({
				      status:"0",
				      msg:'',
				      result:""
				    });
		 			}
		    });
	   	}else{
	   		let checkId = req.cookies.userId;
		   	News.update({newId:newId, "commentList.commentId":commentId},{
						'$pull':{"commentList.$.zanList":{"checkId" : checkId}}
		  	},function (err2,doc2){
		   		if(err2){
			      res.json({
			        status:'1',
			        msg:err2.message,
			        result:''
			      });
			   }else{
				    res.json({
				      status:"0",
				      msg:'',
				      result:""
				    });
		 			}
		    });
	   	}
	   }
  })
});




router.post("/comedit", function (req,res,next) {
	let userName = req.cookies.userName,
			newId = req.body.newId,
	 		commentCon = req.body.commentCon;
  News.findOne({'newId':newId},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
    	User.findOne({'userId':req.cookies.userId},function (err1,doc1){
    		if(err1){
		      res.json({
		        status:'1',
		        msg:err1.message,
		        result:''
		      });
    	 }else{
    			let platform = '01';
		    	let commentDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
		    	let commentZan = '0';
		    	let zanCheck = '0'; 	
		    	let commentName = userName;
		    	let r1 = Math.floor(Math.random()*20);
		    	let r2 = Math.floor(Math.random()*20);
		    	let commentId =  r1  + platform +r2;
		    	let commentAvatar =doc1.userTou;
		    	let comment ={
		    		commentName:commentName,
		    		commentCon:commentCon,
		    		commentDate:commentDate,
		    		commentZan:commentZan,
		    		zanCheck:zanCheck,
		    		commentId:commentId,
		    		commentAvatar:commentAvatar
		    	};
		    	
		    	doc.commentList.push(comment);
		    	
		    	doc.save(function (err2,doc2) {
		          if(err2){
		            res.json({
		              status:"1",
		              msg:err2.message,
		              result:''
		            });
		          }else{
		            res.json({
		              status:"0",
		              msg:'',
		              result:doc2.commentList
		            });
		          }
		       }); 
		    }
     	})	
     }
  })
});


router.get("/checkZan", function (req,res,next) {
	let newId = req.body.newId;
	let checkId = req.cookies.userId;
	let commentId = req.body.commentId,	
			zanCheck = req.body.zanCheck;
	console.log(commentId);
  News.findOne({newId:newId,"commentList.commentId":commentId,"zanList.checkId":checkId},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:""
      });
    }
  }) 
});

router.post("/search", function (req,res,next) {
	let input = req.body.input;
	console.log(input);
	News.createIndex( { "$**" : "text" },function(err,doc) {
		if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      News.find({$text: { $search: input}},function (err1,doc1){
				if(err1){
		      res.json({
		        status:'2',
		        msg:err1.message,
		        result:''
		      });
		    }else{
		      res.json({
		        status:'0',
		        msg:'',
		        result:doc
		      });
		    }
			})
    }
	})
	
})

module.exports = router;