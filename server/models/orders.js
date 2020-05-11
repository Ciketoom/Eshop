let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
  "orderId":String,
	"orderTotalprice" : Number,
	"liuyan" : String,
	"invoice" : String,
	"createdate" : String,
	"orderstate" : String,
	"userId" : String,
	"sexType":String,
	"functionType":String,
	"fiveType":String,
	"chooseaddress" : Array,
  "goodList":Array,
},{usePushEach: true});

module.exports = mongoose.model("Orders",orderSchema);
