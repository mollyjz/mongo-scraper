//why isn't database showing up on robo???????????????????????????????????????????????????

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var path = require("path");

var databaseUrl = "news_db";
var collections = ["articles"];
var db = mongojs(databaseUrl, collections);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_db";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Import models
var Comment = require('../../models/Comment.js');
var Article = require('../../models/Article.js');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INDEX

//when page loads...
app.get("/", function(req, res) { //works
    //load basic HTML
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

app.get("/scrapeold", function(req, res) {
    //console.log("scrape old worked!"); //works
    db.articles.find({"saved": false}, function(error, saved) {
        if (error) {
            console.log(error)
        }
        if (saved) {
            console.log("saved: " + saved) //works but nothing being saved!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        return res.json();
    });
    //grab previously scraped (saved: false) items from db
});

//when click scrape button ("/scrape")...
app.post("/scrapenew", function(req, res) {
    //post newly scraped articles to db
    //console.log("scrape new worked!"); //works
    request("http://nymag.com/daily/intelligencer/", function(error, response, html) {
            //console.log("scraped!") //works
            var $ = cheerio.load(html);
            var articleResults = {};
            //send something back with req??????????????????????????????????????????????????????????????????
            
            $("a.newsfeed-article-link").each(function(i, element) {
                articleResults.title = $(element).attr("data-track-headline");
                articleResults.link = $(element).attr("href");
                articleResults.summary = $(element).find("p").text(); 
                articleResults.saved = false; 
                //console.log("Title: " + articleResults.title + "-----" + "Link: " + articleResults.link + "-----" + "Summary: " + articleResults.summary); //works
                var entry = new Article(articleResults);

                //console.log(entry); //works

                // save entry to db
                entry.save(function(err, doc) {
                    if (err) {
                    console.log(err);
                    }
                });
            });
        }); //console.log("scraped") //works
});

//when click scrape button ("/scrape")...
app.get("/scrapenew", function(req, res) {
    //fetch newly scraped data from db (saved: false)
    //console.log("scrape new 2 worked!"); //works
    db.articles.find({"saved": false}, function(error, saved) {
        if (error) {
            console.log(error)
        }
        if (saved) {
            console.log("saved: " + saved) //works but nothing being saved!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        return res.json();
    });
});

//when click "save" button ("/saved")...
 app.put("/save/:id", function(req, res) {
    //change "saved" to true in db
    //console.log("update to save worked!"); //works
    db.articles.update({_id: mongojs.ObjectID(req.params.id)}, {$set: {"saved": true}}, function(err, saved, data) {
        if (err) {
            console.log(err);
        }
        if (saved) {
            console.log(saved); //works
        }
      });
});

app.delete("/clear", function(req, res) {
    //delete scraped articles from db (saved: false)
    //console.log("clear worked!"); //works
    db.articles.remove({"saved": false}, function(err, data, saved) {
        //console.log("removed!"); //works
        if (err) {
            console.log(err);
        }
        if (data) {
            console.log(data);
        }
      }); 
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


//SAVED

//when page loads ("/saved")...
app.get("/saved", function(req, res) {
    //load basic HTML
    res.sendFile(path.join(__dirname, "../../public", "saved.html"));
    //grab previously saved items from db (saved: true)
    db.articles.find({"saved": true}, function(err, saved, data) {
        if (err) {
            console.log(err)
        };
        if (saved) {
            console.log(saved) //works but not saving new data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    });
});

//when click delete from saved button...
app.put("/delete/:id", function(req, res) {
    //change "saved" to false
    //console.log("saved article deleted!"); //works
    db.articles.update({_id: mongojs.ObjectID(req.params.id)}, {$set: {"saved": false}}, function(err, data, saved) {
        //console.log("saved article deleted") //works
        if (err) {
            console.log(err);
        }
        if (saved) {
            console.log(saved);
        }
      });
});

//when click view comments button...
app.get("/comments/:id", function(req, res) {
    //load "comments" column of that article's db entry
    //console.log("viewing comments!"); //works
    db.articles.find({_id: mongojs.ObjectID(req.params.id)}, function(data, err, saved) {
        //console.log("comments loaded!"); //works
        if (err) {
            console.log(err);
        }
        if (saved) {
            console.log(saved); //works but only saving blank comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        //return data.comments;
  });
});

//in modal, when click save note button...
app.post("/comments/:commentid", function(req, res) {
    //push comment to the comments column of that article's db entry
    // console.log("posted comment!") //works
    db.articles.update({_id: mongojs.ObjectID(req.params.id)}, {$push: {"comments": req.body}}, function(data, err, saved) {
        //console.log("posted comment!"); //works
        console.log(req.body);
        if (err) {
            console.log(err);
        }
        if (saved) {
            console.log(saved); //works but only saving blank comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    });
});

app.delete("/comments/:commentid", function(req, res) {
    //not sure how to delete comment yet
    db.articles.remove({_id: mongojs.ObjectID(req.params.commentid)}, function(data, err, saved) {
        //console.log("comment removed!"); //works
        if (err) {
            console.log(err);
        }
        if (data) {
            console.log(data);
        }
    });
});

module.exports = app;