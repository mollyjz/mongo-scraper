// Dependencies
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser");
//var routes = require("./public/js/routes.js");

app.use("/", require("./public/js/routes.js"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(__dirname + "./public/index.html");

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_db"; /////////////////////////////////////////////////

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

//need separate DB for each user's comments???????????????? Or just loop through all comments and return those with their name? Have comments column in DB

try {
    mongoose.Promise = Promise;
    mongoose.connect(MONGODB_URI);
}
catch(error) {
    console.error(error);
    // expected output: SyntaxError: unterminated string literal
    // Note - error messages will vary depending on browser
}
  


// Database configuration
var databaseUrl = "news_db";
var collections = ["articles"]; //like tables

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

db.on("connect", function() {
    console.log("connected to db!")
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});