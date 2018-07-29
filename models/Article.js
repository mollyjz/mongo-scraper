var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
      link: {
            type: String
      },
      title: {
            type: String,
      },
      summary: {
            type: String,
      },
      saved: {
            type: Boolean,
            default: false
      }
})

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;