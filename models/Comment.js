var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
      comment: {
            type: String
      }
})

const Comment = mongoose.model("comment", CommentSchema);   //creates collection called "ninjas";

module.exports = Comment;