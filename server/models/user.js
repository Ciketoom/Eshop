var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "userTou":String,
  "userTel":String,
  'userAddress':String,
  "collectionList":Array,
  "cartList":[
  	 {
        "productName" : String,
        "productId" : String,
        "productSrc" : String,
        "salePrice" : Number,
        "buynum" : Number,
        "colorType" : [ 
            {
                "colorId" : String,
                "color" : String,
                "colornum" : Number,
                "size" : [ 
                    {
                        "sizeId" : String,
                        "sizetype" : String,
                        "sizenum" : Number
                    }
                ]
            }
        ],
        "color" : String,
        "size" : String,
        "check" : String,
        "collectNum" : Number,
        "sexType":String,
        "functionType":String,
        "fiveType":String
    },
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": String,
      "tel": String,
      "isDefault": Boolean
    }
  ],
},{usePushEach: true});

module.exports = mongoose.model("Users",userSchema);
