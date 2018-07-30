//on load, for each article, generate a paragraph with title and summary printed, plus link to article
// function loadArticles() {
//     $("#article-container").empty();
//     $("#article-container").prepend(
//         // "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
//         "<p>Hello there!<span><button id='delete'>delete</button><span><button id='comments'>View Comments</button></span></span></p>"
//     )
//     // $.ajax({
//     //     method: "PUT",
//     //     url: "/delete?id=" + articleId
//     // }).then(function(data) {
//     //     ////////////////////
//     // });
// }

// $("#article-container").empty();
// $("#article-container").prepend(
//     "<p><span id='articleSpan' data-id=" + data[i]._id + ">" + data[i].title + "<span><button id='delete'>Delete</button></span><span><button id='comments'>View Comments</button></span></span></p>"

var commentsArray = [];


//on load, render saved articles
//USING BUTTON FOR TESTING PURPOSES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
$(document).on("click", "#testing", function(event) {
    event.preventDefault();
    $("#comment-modal").modal("hide");
    $.ajax({
        method: "GET",
        url: "/scrapesaved"
    }).then(function(data) {
        $("#article-container").empty();
        for (var i=0; i<data.length; i++) {
            $("#article-container").prepend(
            "<p><span id='articleSpan' data-id=" + data[i]._id + ">" + data[i].title + "<span><button id='delete'>Delete</button></span><span><button id='comments'>View Comments</button></span></span></p>"
            )
        }
    });
});

//remove from saved
$(document).on("click", "#delete", function(event) {
    event.preventDefault();
    var thisArticle = $(this).parents("#articleSpan");
    thisArticle.saved = false;
    thisArticle.hide();
    var thisArticleId = $(this).parents("#articleSpan").data().id;
    $.ajax({
        method: "PUT",
        url: "/delete/" + thisArticleId
    }).then(function(data) {
        /////////////////////
    });
});

//view comments
$(document).on("click", "#comments", function(event) {
    var modalText = $("<div class='container-fluid text-center' id='comment-modal'>").append(
        $("<h4>").text("Comments"),
        $("<hr>"),
        $("<ul class='list-group note-container'>"),
        $("<textarea placeholder='Enter Comment Here' rows='4' cols='60'>"),
        $("<button class='btn btn-success save'>Save Note</button>")
    );
    // event.preventDefault();
    var thisArticle = $(this).parents("#articleSpan");
    //thisArticle.saved = false;
    var thisArticleId = $(this).parents("#articleSpan").data().id;
    //$("#modal-container").html(modalText);   
    $("#comment-modal").modal(modalText);
    $.ajax({
        method: "GET",
        url: "/comments/" + thisArticleId
    }).then(function(data) {
        console.log("data: " + data)             
    });
}); //comments saved in same db??

//post new comment
$(document).on("click", "#save-comment", function(event) {
    event.preventDefault();
    var thisArticle = $(this).parents("#articleSpan");
    //thisArticle.saved = false;
    var thisArticleId = $(this).parents("#articleSpan").data().id;
    // $("#comment-modal").modal();
    $.ajax({
        method: "POST",
        url: "/comments/" + thisArticleId,
        data: {
            comment: $("#comment-form").val().trim()
        }
    }).then(function(data) {
        console.log("posted comment!")
        $("#comment-container").prepend(data);
        $(thisArticle.comments).append(data);
    });
});

//delete comment
$(document).on("click", "#delete-comment", function(event) {
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/comments/" + commentId
    }).then(function(data) {
        //////////////////////////
    });
});