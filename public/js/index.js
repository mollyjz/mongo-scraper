//TYPE OUT THE SKELETON FIRST AND INPUT VERY BASIC DUMMY DATA/COMPONENTS TO START OUT, THEN MAKE SURE EACH WORKS
//DRAW OUT PAGE, EXPLAIN FUNCTIONALITY OF EACH COMPONENT
//MAP OUT ROUTES AND DB INTERACTIONS


//on load, for each article, generate a paragraph with title and summary printed, plus link to article
function loadArticles() {
    $("#article-container").empty();
        $("#article-container").prepend(
            // "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
            "<p>Hello there.<span><button id='save'>test button!</button></span></p>"
        )
}

$(document).on("click", "#testing", function() {
    loadArticles();
});



////////////////////////////////////////////////////////////////////////////////////

//when page loads...
loadArticles();

//call GET request to load previously scraped articles from database
$(document).on("click", "#testing2", function(event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrapeold",
        data: "testing!"
    }).then(function(data) {
        console.log("hey!"); //not working
        //print previously scraped articles from database
    });
});

$(document).on("click", "#scrape", function(event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "/scrapenew"
    }).then(function(data) {
        //////////////////
    });
    $.ajax({
        method: "GET",
        url: "/scrapenew"
    }).then(function(data) {
        //////////////////
    });
});

$(document).on("click", "#save", function(event) {
    event.preventDefault();
    $.ajax({
        method: "PUT",
        url: "/save?id=" + articleId ////////////////////////
    }).then(function(data) {
        /////////////////////
    });
});

$(document).on("click", "#clear", function(event) {
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/clear"
    }).then(function(data) {
        /////////////////////
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