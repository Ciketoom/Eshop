let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let produtSchema = new Schema({
	"productId": {type:String},
	"productName":String,
	"productSrc":String,
	"productimg":String,
	"fiveType":String,
	"sexType":String,
	"functionType":String,
	"salePrice": Number,
	"brandName":String,
	"bsName":String,
	"checked":Boolean,
  	"productNum":Number,
  	"saleNum":Number,
  	"commentNum":Number,
  	"collectNum":Number,
  	"productContent":String,
  	"productCity":String,
  	"collectUser":[
	  	{
	  		"id":String,
			"userId":String,
		    "userName":String,
		    "userTou":String,
		    "day":String,
	  	}
  	],
  	"colorType":[
  		{
  			"colorId":String,
  			"color":String,
  			"colornum":Number,
  			"size":[
		  		{
		  			"sizeId":String,
		  			"sizetype":String,
		  			"sizenum":Number,	
		  		}
  			],	
  		}
  	],
	"productImg":[
		{
			"imgId":String,
			"imgSrc":String
		}
	],
	"priceCompare":[
		{
			"websiteSrc":String,
			"websiteName":String,
			"price":Number,
			"webicon":String,
		}
	],
	"commentList":[
	    {
	      "commentName":String,
	      "commentCon":String,
	      "commentId":String,
	      "commentZan":String,
	      "zanCheck":String,
	      "commentDate":String,
	      "commentAvatar":String
	    }
    ],
},{usePushEach: true});

module.exports = mongoose.model('Goods',produtSchema);
