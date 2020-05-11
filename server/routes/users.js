let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
require('./../util/util');
let User = require('./../models/user');
let Goods = require('../models/goods');
let Orders = require('../models/orders');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//注册账号的接口
router.post('/register',(req,res) => {
    //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
    //查询数据库中username= req.body.username 的数据
    console.log(req.body.userPwd);
    User.find({userName: req.body.userName},(err,doc) => {
        if(err){
            res.json({
              status:"1001",
              msg:'查询失败'
          });
        }else{
        		if(req.body.userName=='' | req.body.userTel==''| req.body.userPwd=='' | req.body.picLyanzhengma==''){
        			res.json({
		              status:"1002",
		              msg:'用户名，密码,手机号码或验证码不能为空'
          		});
        		}else{
        			console.log('查询成功'+ doc)
	            //data为返回的数据库中的有相同name的集合
	            if(doc!=0){
	                res.json({
			              status:"1003",
			              msg:'该用户已经注册'
	          		});
	            }else{
	            		let mat = '886';
	            		let sysDate = new Date().Format('yyyyMMddhhmmss');
	            		let r1 = Math.floor(Math.random()*10);
	            		let userId = mat + sysDate + r1;
	            		let userAddress = '中国';
	                let newUser = new User({
	                    userName : req.body.userName,
	                    userPwd : req.body.userPwd,
	                    userTou : req.body.userTou,
	                    userTel : req.body.userTel,
	                    userId　:　userId, 
	                    userAddress : userAddress,
	                });  
	                //newUser.save 往数据库中插入数据
	                newUser.save((err,doc) => {
	                    if (err) {
	                        res.json({
							              status:'1',
							              msg:'注册失败',
							              result:''
					          			});
	                    } else {
	                        res.json({
							              status:"0",
							              msg:'注册成功',
							              result:doc.newUser
					          			});
	                    }
	                });
	            }
	        }     
        }
    })
});

//登录接口
router.post("/login", function (req, res, next) {
  let param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  }
  User.findOne(param, function (err,doc) {
      if(err){
	      res.json({
	          status:"1",
	          msg:err.message
	      });
      }else{
          if(doc){
              res.cookie("userId",doc.userId,{
                  path:'/',
                  maxAge:100*24*60*60
              });
              res.cookie("userName",doc.userName,{
                path:'/',
                maxAge:100*24*60*60
              });
//            req.session.user = doc;
              res.json({
                  status:'0',
                  msg:'',
                  result:doc.userId
              });
          }else{
          	res.json({
              status:'1',
              msg:'',
              result:''
          });
        }
      }
  });
});
//登出接口
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.cookie("userName","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});
//检查是否已经登录
router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
      res.json({
        status:'0',
        msg:'',
        result:req.cookies.userName || ''
      });
	  }else{
	    res.json({
	      status:'1',
	      msg:'未登录',
	      result:''
	    });
	  }
});
//获取用户头像
router.get('/checkTou', function (req,res,next) {
	let userId = req.cookies.userId;
	User.findOne({userId:userId},function (err,doc){
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

//获取用户基本信息
router.get('/getpersonal', function (req,res,next) {
	let userId = req.cookies.userId;
	User.findOne({userId:userId},function (err,doc){
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

router.get('/collectList', function (req,res,next) {
	let userId = req.cookies.userId;
	User.findOne({userId:userId},function (err,doc){
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
        result:doc.collectionList
      });
    }
	}) 
});
//删除收藏的商品
router.post("/delcollect", function (req,res,next) {
  let userId = req.cookies.userId,
  		productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'collectionList':{
        'productId':productId
      }
    }
  }, function (err,doc) {
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
  });
});


//修改用户头像
router.post("/editTou", function (req, res, next) {
  let userId = req.cookies.userId;
  let userTou = req.body.userTou;
  User.update({"userId":userId,},{
    "userTou":userTou,
  }, function (err,doc) {
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
        result:'suc'
      });
    }
  })
});

//修改用户基本信息
router.post("/editpersonal", function (req, res, next) {
  let userId = req.cookies.userId;
  let userName = req.body.userList.userName;
  let userTel = req.body.userList.userTel;
  let userAddress = req.body.userList.userAddress;
  User.update({"userId":userId,},{
    "userName":userName,
    "userTel":userTel,
    "userAddress":userAddress,
  }, function (err,doc) {
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
        result:'suc'
      });
    }
  })
});

//获取用户地址列表
router.get('/deaddress', function (req,res,next) {
	let userId = req.cookies.userId;
	User.findOne({userId:userId},function (err,doc){
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
        result:doc.addressList
      });
    }
	}) 
});

//地址管理添加新地址
router.post("/zengaddress", function (req, res, next) {
  let userId = req.cookies.userId;
  let userName = req.body.userName;
  let tel = req.body.tel;
  let postCode = req.body.postCode;
  let streetName = req.body.streetName;
  User.findOne({userId:userId},function (err,doc){
	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{
   		let addressform = '2019';
		  let r1 = Math.floor(Math.random()*500) + 100; 	
		  let r2 = Math.floor(Math.random()*500) + 100;
    	let addressId = r1  + addressform + r2;
    	let isDefault = 'false';
    	let newaddress ={
		    		userName:userName,
		    		tel:tel,
		    		postCode:postCode,
		    		addressId:addressId,
		    		isDefault:isDefault,
		    		streetName:streetName,
		    	};
		    	
		  doc.addressList.push(newaddress);
		  
		  doc.save(function (err1,doc1) {
	      if(err1){
	        res.json({
	          status:"2",
	          msg:err1.message,
	          result:''
	        });
	      }else{
	        res.json({
	          status:"0",
	          msg:'',
	          result:doc1.addressList
	        });
	      }
	   }); 
    }
	}) 
});

//地址管理之修改地址
router.post("/modifyaddress", function (req, res, next) {
  let userId = req.cookies.userId;
  let userName = req.body.addressOne.userName;
  let tel = req.body.addressOne.tel;
  let addressId = req.body.addressOne.addressId;
  let streetName = req.body.addressOne.streetName;
  User.update({userId:userId, "addressList.addressId":addressId},{
  	"addressList.$.userName":userName,
  	"addressList.$.tel":tel,
  	"addressList.$.streetName":streetName,
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
	      result:doc.addressList
	    });
    }
	}) 
});

//设置默认地址
router.post("/shedefault", function (req,res,next) {
  let userId = req.cookies.userId,
      addressId = req.body.addressOne.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null',
      result:''
    });
  }else{
    User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var addressList = doc.addressList;
        addressList.forEach((item)=>{
          if(item.addressId == addressId){
             item.isDefault = true;
             doc.userAddress = item.streetName;
          }else{
            item.isDefault = false;
          }
        });
        doc.save(function (err1,doc1) {
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
	            result:doc1.addressList
	          });
          }
        })
      }
    });
  }
});

//删除地址
router.post("/removeaddress", function (req,res,next) {
  let userId = req.cookies.userId,
  		addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  }, function (err,doc) {
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
          result:doc.addressList
        });
      }
  });
});

//获取用户购物车信息
router.get('/getgoodcartList', function (req,res,next) {
	let userId = req.cookies.userId;
	User.findOne({userId:userId},function (err,doc){
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
          result:doc.cartList
        });
    }
	}) 
});

//购物车中修改商品信息
router.post("/modifygoodCart", function (req, res, next) {
  let productId = req.body.productId;
  let buynum = req.body.buynum;
  let userId = req.cookies.userId;
  let color = req.body.color;
  let size = req.body.size;
  let check = req.body.check;
  User.update({userId:userId, "cartList.productId":productId},{
  	"cartList.$.buynum":buynum,
  	"cartList.$.color":color,
  	"cartList.$.check":check,
  	"cartList.$.size":size,
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
	}) 
});

//删除购物车上的商品
router.post("/removegood", function (req,res,next) {
  let userId = req.cookies.userId,
  		productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  }, function (err,doc) {
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
  });
});

//购物车选中的修改
router.post("/modifyselect", function (req,res,next) {
  let userId = req.cookies.userId;
  let checked = req.body.selectall?'1':'0';
  User.findOne({userId:userId}, function (err,doc1) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
    	if(doc1){
    		doc1.cartList.forEach(function (item) {
	        item.check = checked;
			  });
        doc1.save(function (err2,doc2) {
	        if(err2){
	          res.json({
	            status:'1',
	            msg:err2,message,
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
    	}    
		}
  });
});


//生成订单
router.post("/generateorder", function (req,res,next) {
  let userId = req.cookies.userId,
  		goodList = req.body.goodList,
      chooseaddress = req.body.chooseaddress,
      liuyan = req.body.liuyan,
      invoice = req.body.invoice,
      sexType = req.body.sexType,
      functionType = req.body.functionType,
      fiveType = req.body.fiveType,
      orderTotalprice = req.body.Totalprice;
  User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
	        status:'1',
	        msg:err.message,
	        result:''
        });
      }else{
      	let manum = '8866';
	      let tou = Math.floor(Math.random()*500) + 100;
	      let wei = Math.floor(Math.random()*500) + 100;
	      let daten = new Date().Format('yyyyMMddhhmmss');
	      let createdate = new Date().Format('yyyy-MM-dd hh:mm:ss');
	      let orderId = manum + tou + daten + wei;
	      let neworder = {
	          orderId:orderId,
	          orderTotalprice:orderTotalprice,
	          liuyan:liuyan,
	          invoice:invoice,
	          goodList:goodList,
	          createdate:createdate,
	          orderstate:'待付款',
	          userId:userId,
	          sexType:sexType,
	          fiveType:fiveType,
	          functionType:functionType,
	          chooseaddress:chooseaddress
	      };
				Orders.create(neworder);
	      doc.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:"1",
              msg:err1.message,
              result:''
            });
          }else{
          	let check = '1';
          	doc.cartList.forEach((item)=>{
          		let productId = item.productId;
          		let color = item.color;
          		let size = item.size;
		          if(item.check == check){
		            Goods.findOne({productId:productId},function (err2,doc2){
		            	if(err2){
						        res.json({
						            status:'1',
						            msg:err2.message,
						            result:''
						        });
						      }else{
		            		doc2.productNum = doc2.productNum  - item.buynum;          	
										doc2.colorType.forEach((itemcolor)=>{
											if(itemcolor.color == color){
												itemcolor.colornum  = itemcolor.colornum -item.buynum;
												itemcolor.size.forEach((itemsize)=>{
													if(itemsize.sizetype == size){
															itemsize.sizenum = itemsize.sizenum - item.buynum;
													}
												})
											}
											doc2.save(function (err3,doc3) {})
										})
		          		}
		          	});
		          }
		        });
          	User.update({userId:userId},{ $pull:{'cartList':{'check': check }}}, function (err4,doc4) {
				      if(err4){
				        res.json({
				            status:'1',
				            msg:err4.message,
				            result:''
				        });
				      }else{
				        res.json({
				          status:'0',
				          msg:'',
				          result:{
		                orderId:neworder.orderId,
		                orderTotalprice:neworder.orderTotalprice
		              }
				        });
				      }
					  });       
          }
	      });      
      }
  });
});

//获取用户订单
router.get('/getorderlist', function (req,res,next) {
	let userId = req.cookies.userId;
	Orders.find({userId:userId},function (err,doc){
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
//获取订单详情
router.get("/orderdetail", function (req,res,next) {
	let orderId = req.param("orderId");
	 let userId = req.cookies.userId;
  Orders.findOne({orderId:orderId,'userId':userId},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{	
	  	res.json({
        status:'0',
        msg:"",
        result:doc
     });
    }
  }) 
});

//删除订单
router.post("/removeorder", function (req,res,next) {
  let userId = req.cookies.userId,
  		orderId = req.body.orderId;
  Orders.remove({userId:userId,'orderId':orderId}, function (err,doc) {
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
  });
});

//修改订单状态
router.post("/stateorder", function (req,res,next) {
  let userId = req.cookies.userId,
  		orderId = req.body.orderId;
  Orders.update({userId:userId,'orderId':orderId},{
    "orderstate":'待评价',
  }, function (err,doc) {
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
  });
});

//订单的搜索
router.get("/searchorder", function (req,res,next) {
	let search = req.param("search");
	console.log(search);
  Orders.find({ $text: { $search: search } },function (err,doc){
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
//后台获取用户列表
router.get("/busersList", function (req,res,next) {
  User.find({},function (err,doc){
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

//后台获取所有订单
router.get("/borderList", function (req,res,next) {
  Orders.find({},function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{	
	  	res.json({
        status:'0',
        msg:"",
        result:doc
     });
    }
  }) 
});
//订单确认发货
router.post("/borderfa", function (req,res,next) {
  Orders.update({orderId:req.body.orderId},{
    "orderstate":'待收货',
  },function (err,doc){
  	if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
   }else{	
	  	res.json({
        status:'0',
        msg:"",
        result:''
     });
    }
  }) 
});
module.exports = router;