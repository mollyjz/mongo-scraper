//on load, for each article, generate a paragraph with title and summary printed, plus link to article
function loadArticles() {
    $("#article-container").empty();
    $("#article-container").prepend(
        // "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
        "<p>Hello there!<span><button id='delete'>delete</button><span><button id='comments'>View Comments</button></span></span></p>"
    )
    $.ajax({
        method: "PUT",
        url: "/delete?id=" + articleId
    }).then(function(data) {
        ////////////////////
    });
}

//on load, render saved articles
$(document).on("click", "#testing", function(event) {
    event.preventDefault();
    loadArticles();
});

$(document).on("click", "#delete", function(event) {
    $.ajax({
        method: "PUT",
        url: "/delete?id=" + articleId
    }).then(function(data) {
        /////////////////////
    });
});

//view comments
$(document).on("click", "#comments", function(event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/comments?id=" + articleId
    });
});

//post new comment
$(document).on("click", "#save-comment", function(event) {
    event.preventDefault();
    $("#comment-modal").modal();
    $.ajax({
        method: "POST",
        url: "/comments?commentid=" + commentId
    }).then(function(data) {
        ////////////////////////
    });
});

//delete comment
$(document).on("click", "#delete-comment", function(event) {
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/comments?commentid=" + commentId
    }).then(function(data) {
        //////////////////////////
    });
});