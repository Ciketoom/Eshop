let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let newsSchema = new Schema({
	"newId": String,
	"newTitle":String,
	"newAuthor": String,
	"newDate":String,
	"newImage":String,
	"newContent":String,
  	"newClicks":Number,
	"commentList":[
	    {
	      "commentName":String,
	      "commentCon":String,
	      "commentId":String,
	      "commentZan":String,
	      "zanCheck":String,
	      "commentDate":String,
	      "commentAvatar":String,
	      "zanList":[
	      	{
	      		"checkId":String,
	      		"zan":String,
	      	}
	      ],
	    }
    ],
},{usePushEach: true});

module.exports = mongoose.model('News',newsSchema);
