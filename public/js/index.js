//on load, for each article, generate a paragraph with title and summary printed, plus link to article
// function loadArticles() {
//     $("#article-container").empty();
//         $("#article-container").prepend(
//             "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
//             // "<p>Hello there.<span><button id='save'>test button!</button></span></p>"
//         )
// }

////////////////////////////////////////////////////////////////////////////////////

//when page loads...
//loadArticles();

//THIS SHOULD REALLY BE ON LOAD BUT USING BUTTON FOR TESTING PURPOSES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//call GET request to load previously scraped articles from database
$(document).on("click", "#testing", function(event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrapeold",
        data: "testing!" ////////////////////////////////////////////////need to pass something in????????
    }).then(function(data) {
        for (var i=0; i<data.length; i++) {
            console.log("hey!"); //not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            console.log(data);
            $("#article-container").empty();
            $("#article-container").prepend(
            "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
            // "<p>Hello there.<span><button id='save'>test button!</button></span></p>"
        );
        };
    });
});

$(document).on("click", "#scrape", function(event) {
    event.preventDefault();
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
        for (var i=0; i<data.length; i++) {
        console.log("data: " + data);
        $("#article-container").empty();
        $("#article-container").prepend(
            "<p><span id='articleTitle' data-id=" + data[i]._id + ">" + data[i].title + "<span><button>Save</button></span></span></p>"
            // "<p>Hello there.<span><button id='save'>test button!</button></span></p>"
        );
        //loadArticles(); /////////////////////////////////////////////
    }
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