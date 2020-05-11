let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
require('./../util/util');
let Goods = require('../models/goods');
let User = require('../models/user');
let Orders = require('../models/orders');
let qnconfig = require('../config.js')
// 处理请求
router.get('/token', (req, res, next) => {
  // console.log(qnconfig.uploadToken)
  res.status(200).send(qnconfig.uploadToken)
})
router.get("/goodsList", function (req,res,next) {
  Goods.find({}).sort({'saleNum': -1 }).exec(function (err1,doc1){
  	if(err1){
      res.json({
        status:'1',
        msg:err1.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc1 
      });
    }
  })
});

router.get("/loveList", function (req,res,next) {
  Goods.find({}).sort({'collectUser.day': -1 }).limit(9).exec(function (err,doc){
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

router.get("/similargoods", function (req,res,next) {
	let sexType = req.param("sexType");
  Goods.find({sexType:sexType}).sort({'saleNum':-1}).limit(9).exec(function (err,doc){
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

router.get("/gooddetails", function (req,res,next) {
	let productId = req.param("productId");
  Goods.findOne({productId:productId},function (err,doc){
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
//收藏商品
router.post("/collectgood", function (req,res,next) {
  let userId = req.cookies.userId;
  let	productId = req.body.productId;
  let	productName = req.body.productName;
  let salePrice = req.body.salePrice;
  let productSrc = req.body.productSrc;
  User.findOne({userId:userId}, function (err,userdoc) {
    if(err){
	    res.json({
	        status:'1',
	        msg:err.message
	    })
    }else{
    	User.findOne({userId:userId, "collectionList.productId":productId}, function (err1,doc1) {
		    if(doc1){
			    res.json({
			        status:'2',
			        msg:""
			    })
		    }else{
		    	let collectNum = req.body.collectNum + 1;
		    	Goods.update({productId:productId},{
  					"collectNum":collectNum,
			  	},function (err2,doc2){
			   		if(err2){
				      res.json({
				        status:'1',
				        msg:err2.message,
				        result:''
				      });
				   }else{ 
		        	let id = '1';
		        	let userName = userdoc.userName;
		        	let userTou = userdoc.userTou;
		        	let userId = userdoc.userId;
		        	let day = new Date().Format('yyyy-MM-dd');
			        Goods.update({productId:productId, "collectUser.id":id},{
								"collectUser.$.userName":userName,
		  					"collectUser.$.userTou":userTou,
		  					"collectUser.$.userId":userId,
		  					"collectUser.$.day":day,
					  	},function (err3,doc3){
					   		if(err3){
						      res.json({
						        status:'1',
						        msg:err3.message,
						        result:''
						      });
						   }else{  
              		let coolectDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
                	let newcollect = {
                		productId:productId,
                		productName:productName,
                		salePrice:salePrice,
                		productSrc:productSrc,
                		coolectDate:coolectDate,
                	};
                	userdoc.collectionList.push(newcollect);
                	
                	userdoc.save(function (err4,doc4) {
		                if(err3){
		                  res.json({
		                    status:'1',
		                    msg:err4.message
		                  })
		                }else{
		                  res.json({
		                    status:'0',
		                    msg:'',
		                    result:'suc'
		                  })
	                	}
              		})
            		}
          		});
           }
        });
    	}
		})
    }
  });
});
//商品详情页加入购物车
router.post("/addgoodcart", function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productName = req.body.productName;
  let productSrc =req.body.productSrc;
  let salePrice = req.body.salePrice;
  let buynum = req.body.buynum;
  let colorType = req.body.colorType;
  let color = req.body.color;
  let size = req.body.size;
  let sexType = req.body.sexType;
  let fiveType = req.body.fiveType;
  let functionType = req.body.functionType;
  let collectNum = req.body.collectNum;
  User.findOne({userId:userId},function (err,doc){
	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
 	}else{
 		User.findOne({userId:userId, "cartList.productId":productId},function (err1,doc1){
			if(doc1){
				doc.cartList.forEach( (item)=>{
				if(item.productId == productId){
	        let buyNum = buynum +item.buynum;
			 		User.update({userId:userId, "cartList.productId":productId},{
						"cartList.$.color":color,
						"cartList.$.size":size,
						"cartList.$.buynum":buyNum,
				  	},function (err2,doc2){
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
			          result:"suc1"
			        });
					 	}
					 })
		    	}
				});
			}else{
	    	let check = '0';
	    	let newcart ={
	    		productName:productName,
	    		productId:productId,
	    		productSrc:productSrc,
	    		salePrice:salePrice,
	    		buynum:buynum,
	    		colorType:colorType,
	    		color:color,
	    		size:size,
	    		check:check,
	    		collectNum:collectNum,
	    		functionType:functionType,
	    		sexType:sexType,
	    		fiveType:fiveType,
	    	};
	    	console.log(newcart);
			  doc.cartList.push(newcart);
			  
			  doc.save(function (err3,doc3) {
		      if(err3){
		        res.json({
		          status:"1",
		          msg:err3.message,
		          result:''
		        });
		      }else{
		        res.json({
		          status:"0",
		          msg:'',
		          result:"suc"
		        });
		      }
		   });	 	
 			}
		})
 	}
 	})
});

//立即购买接口
router.post("/buygood", function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productName = req.body.productName;
  let productSrc =req.body.productSrc;
  let salePrice = req.body.salePrice;
  let buynum = req.body.buynum;
  let colorType = req.body.colorType;
  let color = req.body.color;
  let size = req.body.size;
  let sexType = req.body.sexType;
  let fiveType = req.body.fiveType;
  let functionType = req.body.functionType;
  let collectNum = req.body.collectNum;
  User.findOne({userId:userId},function (err1,doc){
	if(err1){
      res.json({
        status:'1',
        msg:err1.message,
        result:''
      });
  }else{
 			let guiling = 0;
			doc.cartList.forEach(function (item) {
        item.check = guiling;
        console.log(item.check);
		  });
			let check = 1;
			let newcart ={	
				productName:productName,
				productId:productId,
				productSrc:productSrc,
				salePrice:salePrice,
				buynum:buynum,
				colorType:colorType,
				color:color,
				size:size,
				check:check,
				collectNum:collectNum,
				functionType:functionType,
	    	sexType:sexType,
	    	fiveType:fiveType,
			};
		  doc.cartList.push(newcart);
		  
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
	          result:"suc"
	        });
	      }
	   });	 	
		}
 	})
});
//商品的筛选分类
router.get("/goodList", function (req,res,next) {
	let fiveType = req.param("fiveType");
	let brandName = req.param("brandName");
	let sexType = req.param("sexType");
	let touprice = req.param("touprice");
	let weiprice = req.param("weiprice");
	let salesort = req.param("salesort");
	let commentsort = req.param("commentsort");
	let pricesort = req.param("pricesort");
	let pagenum = req.param("pagenum");
	let skip = (pagenum-1)*10;
	let functionType = req.param("functionType");	
	let	params = {
	  brandName:brandName,
		sexType:sexType,
		functionType:functionType,
		fiveType:fiveType,
		salePrice:{
      $gt:touprice,
      $lt:weiprice
   	},
	}
	for ( let key in params ){
		if ( params[key] === undefined || params[key] === '' || params[key] === '全部商品'){
			delete params[key]
		}
	}
	Goods.find(params,function (err1,doc1) {
	let sortgood = Goods.find(params).skip(skip).limit(10);
	if(pricesort!= ''){
		sortgood.sort({'salePrice':pricesort});
	}else if(salesort!=''){
		sortgood.sort({'saleNum':salesort});
	}else if(commentsort!=''){
		sortgood.sort({'commentNum':commentsort});
	}
	sortgood.exec(function (err,doc) {
		if(err) {
			res.json({
				status:'1',
				msg:err.message
			});
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:doc1.length,
					list:doc
				}
			});
		}});
	})
});

//商品加入购物车
router.post("/addgoodcarts", function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productName = req.body.productName;
  let productSrc =req.body.productSrc;
  let salePrice = req.body.salePrice;
  let colorType = req.body.colorType;
  let collectNum = req.body.collectNum;
  let sexType = req.body.sexType;
  let functionType = req.body.functionType;
  let fiveType = req.body.fiveType;
  console.log(fiveType);
  User.findOne({userId:userId},function (err,doc){
		if(err){
	      res.json({
	        status:'1',
	        msg:err.message,
	        result:''
	      });
	 	}else{
	 		let cun ="";
			doc.cartList.forEach( (item)=>{
				if(item.productId == productId){
					item.buynum++; cun = item;
	     }
		 	});
		 	if(cun){
		 		doc.save(function (err2,doc2) {
          if(err2){
            res.json({
              status:'1',
              msg:err2.message
            })
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            })
          }
        })
		 	}else{
		 		let check = '0';
		 		let color = '默认';
		 		let size = '默认';
		 		let buynum = '1';
	    	let newcart ={
	    		productName:productName,
	    		productId:productId,
	    		productSrc:productSrc,
	    		salePrice:salePrice,
	    		buynum:buynum,
	    		colorType:colorType,
	    		check:check,
	    		color:color,
	    		size:size,
	    		collectNum:collectNum,
	    		functionType:functionType,
	    		sexType:sexType,
	    		fiveType:fiveType,
	    	};
			  doc.cartList.push(newcart);
			  
			  doc.save(function (err3,doc3) {
		      if(err3){
		        res.json({
		          status:"1",
		          msg:err3.message,
		          result:''
		        });
		      }else{
		        res.json({
		          status:"0",
		          msg:'',
		          result:"suc"
		        });
		      }
		   });	 	
		 	}
		}
 	})
});

//商品的评价
router.post("/commentgood", function (req,res,next) {
	let userName = req.cookies.userName,
			productId = req.body.productId,
			orderId = req.body.orderId,
	 		commentCon = req.body.commentCon;
  Goods.findOne({'productId':productId},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{
    	Orders.update({'userId':req.cookies.userId,'orderId':orderId},{
  		"orderstate":'已评价',
  		},function (err1,doc1){
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
		              result:""
		            });
		          }
		       }); 
		    }
     	})	
     }
  })
});
//点赞商品评论
router.post("/goodzanEdit", function (req,res,next) {
	let productId = req.body.productId,
			commentZan = req.body.commentZan,
			commentId = req.body.commentId,
			zanCheck = req.body.zanCheck;
			console.log(productId);
  Goods.update({productId:productId, "commentList.commentId":commentId},{
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
	    res.json({
	      status:"0",
	      msg:'',
	      result:""
	    });
		}
   });
});
//搜索商品
router.get("/searchgood", function (req,res,next) {
	let soushuo = req.param("soushuo");
	console.log(soushuo);
  Goods.find({ $text: { $search: soushuo } },function (err,doc){
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
//获取所有商品数据
router.get("/bgoodsList", function (req,res,next) {
  Goods.find({}).sort({'saleNum': -1 }).exec(function (err,doc){
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
//批量删除商品
router.post("/bgooddel", function (req,res,next) {
	let tablecheck = req.body.tablecheck;
  Goods.deleteMany({_id: {$in: tablecheck}},function (err,doc){
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
        result:''
      });
    }
  })
});
//新增商品
router.post("/bgoodzeng", function (req,res,next) {
		let newgood = req.body.newgood;
		let platform = '364';
		let r1 = Math.floor(Math.random()*30);
		let r2 = Math.floor(Math.random()*30);
		let productId = r1 + platform + r2;
		let checked = false;
		let bsName = newgood.brandName+newgood.sexType;
		let collectuser = {
			id:'1',
			userId:'',
			userName:'',
			userTou:'',
			day:'',
		};
	  let newgoods ={
	  	productId:productId,
			productName:newgood.productName,
			productSrc:newgood.productSrc,
			productimg:newgood.productimg,
			fiveType:newgood.fiveType,
			sexType:newgood.sexType,
			functionType:newgood.functionType,
			salePrice:newgood.salePrice,
			brandName:newgood.brandName,
			bsName:bsName,
			productNum:newgood.productNum,
			saleNum:newgood.saleNum,
			checked:checked,
			commentNum:newgood.commentNum,
			collectNum:newgood.collectNum,
			productCity:newgood.productCity,
			productContent:newgood.productContent,
			collectUser:collectuser,
			priceCompare:newgood.priceCompare,
			productImg:newgood.productImg,
			colorType:newgood.colorType,
		};
		Goods.create(newgoods);
		Goods.findOne({productId:productId},function(err,doc){
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
	        result:''
	      });
	    }
		})
});
//新增图集中图片
router.post("/bgoodzengj", function (req,res,next) {
	let imgurl = req.body.productImg;
	Goods.findOne({productId: req.body.productId},function (err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			});
		}else{
			doc.productImg.push(imgurl);
			doc.save(function (err2,doc2) {				
				  res.json({
					status:"0",
					msg:'',
					result:""
				  });
			 });
		}
	})
});
//删除商品图集update({
router.post("/bgoodtjdel", function (req,res,next) {
  Goods.update({productId: req.body.productId},{$pull:{'productImg':{"imgId":req.body.imgId}}},function (err,doc){
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
        result:''
      });
    }
  })
});
module.exports = router;
