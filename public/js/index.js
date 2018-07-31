//on load, for each article, generate a paragraph with title and summary printed, plus link to article
// function loadArticles() {
//     $("#article-container").empty();
//         $("#article-container").prepend(
//             "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
//             // "<p>Hello there.<span><button id='save'>test button!</button></span></p>"
//         )
// }

////////////////////////////////////////////////////////////////////////////////////


//THIS SHOULD REALLY BE ON LOAD BUT USING BUTTON FOR TESTING PURPOSES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//call GET request to load previously scraped articles from database
//$(document).on("click", "#testing", function(event) {
    window.onload = function() {    
//event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/scrapeold"
        }).then(function(data) {
            $("#article-container").empty();
            for (var i=0; i<data.length; i++) {
                // console.log("data: " + data[i])
                // $("#test").prepend(data[i]);
                //console.log(data); //works
                $("#article-container").append(
                    "<p><div class='container-fluid'><span id='articleSpan' data-id=" + data[i]._id + ">" + data[i].title + "&nbsp;<span><button id='save' type='button' class='btn btn-warning'>Save</button></span></span></div></p>"
                );
            }; //so just need to grab the data-id attribute of each article's span
    });
    }
//});

$(document).on("click", "#scrape", function(event) {
    event.preventDefault();
    $("#article-container").empty();
    $.ajax({
        method: "POST",
        url: "/scrapenew"
    // }).then(function(data) {
    //     //////////////////
    });
    $.ajax({
        method: "GET",
        url: "/scrapenew"
    }).then(function(data) {
        $("#article-container").empty();
        for (var i=0; i<data.length; i++) {
        //console.log("data: " + data); //works
        $("#article-container").append(
            "<p><span id='articleSpan' data-id=" + data[i]._id + ">" + data[i].title + "&nbsp;<span><button id='save' type='button' class='btn btn-warning'>Save</button></span></span></p>"
        );
    }
    });
});


$(document).on("click", "#save", function(event) {
    event.preventDefault();
    // var articleId = $(this).parents("#articleSpan").attr("data-id");
    var thisArticle = $(this).parents("#articleSpan");
    //console.log(thisArticle);
    thisArticle.saved = true;
    var thisArticleId = $(this).parents("#articleSpan").data().id;
    // console.log(thisArticleId);
    $.ajax({
        method: "PUT",
        url: "/save/" + thisArticleId
    }).then(function(data) {
        thisArticle.hide();
        //console.log("saved") //works
    });
});

$(document).on("click", "#clear", function(event) {
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/clear"
    }).then(function(data) {
        $("#article-container").empty();
    });
});



////////////////////////////////////////////////////////////////////////////////////




    
    
//when clear button is clicked...
    //call DELETE request to clear database
    //clear articles from screen
//when save button is clicked for an article...
    //call PUT request
//when scrape button is clicked...
    //call POST request
    //call GET request