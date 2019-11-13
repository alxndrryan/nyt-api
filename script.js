// SETUP VARIABLES
//===================================

var authKey = "GZXcDpge4KDRCUGtt8xPq7GbVseTiRhh"

//Search Parameters
var queryTerm    = "";
var numResults   = 0;
var startYear    = 0;
var endYear      = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to Track number of articles
var articleCounter = 0;

// FUNCTIONS
//===================================

function runQuery(numArticles, queryURL){

    //AJAX Function
    $.ajax({url: queryURL, method: "GET"})
        .done(function(NYTData) {

            //Clear the wells from the previous run
            $('#wellSection').empty();

            for (var i=0; i<numArticles; i++){
                console.log(NYTData.response.docs[i].headline.main);

                // Start Dumping to HTML Here
                var cardSection = $('<div>');
                cardSection.addClass("card-header");
                cardSection.attr('id', 'articleWell-' + i);
                $('#wellSection').append(cardSection);

                // Check if things exist
                if (NYTData.response.docs[i].headline != "null") {
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }

                // Check if the byline exists
                if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                }

                // Attach content to the appropriate well
                
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                
                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");



            }

            //Logging to Console
            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);
        })
}



// MAIN PROCESSES
//===================================

$('#searchBtn').on('click', function() {

    // Get Search Term
    queryTerm = $('#search').val().trim();

    var newURL = queryURLBase + "&q=" + queryTerm;

    // Get the Number of Records
    numResults = $("#numRecords").val();

    // Get the Start Year and End Year
    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim();

    if (parseInt(startYear)) {

        // Add the necessary fields
        startYear = startYear + "0101";

        // Add the date information to the URL
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {

        // Add the necessary fields
        endYear = endYear + "0101";

        // Add the date information to the URL
        newURL = newURL + "&end_date=" + endYear;
    }

    console.log(newURL);

    //Send the AJAX Call the newly assembled URL
    runQuery(numResults, newURL);

    return false;
})


//1. Retrieve user-inputs and convert to variables
//2. Use those variables to run an AJAX call to the New York Times
//3. Breakdown the NYT Object into useable fields
//4. Dynamically generate html content

//5. Dealing with "edge cases" -- bugs or situations that are not intuitive