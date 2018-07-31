//on load, for each article, generate a paragraph with title and summary printed, plus link to article

//$("#comment-modal").modal("hide");

var commentsArray = [];

//on load, render saved articles
//USING BUTTON FOR TESTING PURPOSES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//$(document).on("click", "#testing", function(event) {
window.onload = function() {
    $("#comment-modal").modal("hide");
    $.ajax({
        method: "GET",
        url: "/scrapesaved"
    }).then(function(data) {
        $("#article-container").empty();
        for (var i=0; i<data.length; i++) {
            $("#article-container").append(
                "<p><span id='articleSpan' data-id=" + data[i]._id + ">" + data[i].title + "&nbsp;<span><button id='comments' type='button' class='btn btn-warning'>View Comments&nbsp;</button><button id='delete' type='button' class='btn btn-danger'>Delete</button></span></span></p>"
            );
        }
    });
}

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
    // }).then(function(data) {
    //     /////////////////////
    });
});

//view comments
$(document).on("click", "#comments", function(event) {
    event.preventDefault();
    // var modalText = $("<div class='container-fluid text-center' id='comment-modal'>").append(
    //     $("<h4>").text("Comments"),
    //     $("<hr>"),
    //     $("<ul class='list-group note-container'>"),
    //     $("<textarea placeholder='Enter Comment Here' rows='4' cols='60'>"),
    //     $("<button class='btn btn-success save'>Save Note</button>")
    // );
    var thisArticle = $(this).parents("#articleSpan");
    var thisArticleId = $(this).parents("#articleSpan").data().id;
    $.ajax({
        method: "GET",
        url: "/comments/" + thisArticleId
    }).then(function(data) {
        //need to append data to modal
        //$("#comment-modal").modal("show");
        console.log("data: " + data); ////////////////////////////////////////////
        // var noteData = {
        //     _id: thisArticleId, //need this.thisArticleId?
        //     notes: data || []
        // };
        console.log(this.thisArticleId) /////NOTHING!!
        $("#save-comment").attr("data-article", this.thisArticleId); //when click save comment button, assign the button a data-article attribute to store the article's ID and the note being added
        $("#delete-comment").attr("data-article", this.thisArticleId); //when click save delete button, assign the button a data-article attribute to store the article's ID and the note being added
    });
});

// NO WAY TO REFERENCE THE ARTICLE FROM HERE SINCE THE MODAL IS STUCK ON THE PAGE RATHER THAN LOADING FOR EACH ARTICLE ON CLICK!!!!!!!
//post new comment
$(document).on("click", "#save-comment", function(event) {
    event.preventDefault();
    $("#comment-modal").modal();
    var noteData;
    console.log($(this).attr("data-article")); ////////////////////////////////////////////// WHY UNDEFINED??
    var newNote = $("#comment-form").val().trim();
    if (noteData) {
        noteData = {
            _matchingArticle: $(this).attr("data-article")._id, ////////////////////////////////////
            noteText: newNote
        }

        $.ajax({
            method: "POST",
            url: "/comments/" + thisArticleId,
            data: noteData
        }).then(function(data) {
            console.log("posted comment!")
            $("#comment-container").append(data);
            thisArticle.comments.append(data);
        });

    }

});


//delete comment
$(document).on("click", "#delete-comment", function(event) {
    var thisComment; /////////////////////////////////////////////////////////
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/comments/" + commentId
    }).then(function(data) {
        thisComment.hide();
    });
});