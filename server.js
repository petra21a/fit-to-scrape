////EXPRESS////
//require express
const express = require("express");

//initialize express
const app = express();
const PORT = process.env.PORT || 8080;

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

///EXPRESS-HANDLEBARS////
//require handlebars
const exphbs = require("express-handlebars");

//initialize handlebars reference to views/main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

////MIDDLE WARE////
////BODY PARSER////
//require body parser
const bodyParser = require("body-parser");

// Use body-parser for handling form submissions
//urlencoded: 
//only passes where Content-Type header matches 'type' option
//parses data into request object, req.body
//if extended = false, will limit key value pairs to string or array types
//if extended = true, will allow key value pairs of any type
//'extended' relates to difference between qs and querystring
app.use(bodyParser.urlencoded({ extended: true }));

////REQUEST////
//require request
const request = require("request");

////CHEERIO////
//require cheerio
const cheerio = require("cheerio");;

///SCRAPING TEST////
const uri = "https://www.entrepreneur.com/topic/coding"
request(uri, (error, response, html) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(html);

    const results = [];

    $('.pl').each((i, element) => {
const headline = $(element).find(".block").find("h3").attr("data-ga-action","headline").text();
const summary = $(element).find(".deck").text()
const url =$(element).find(".block").find("h3").children().attr("href");
const photo = $(element).find(".hero").children().find("img").attr("src");
const byline = $(element).find(".byline").find(".name").text();

        results.push({
            headline: headline,
            summary: summary,
            url: url,
            photo: photo,
            byline: byline
        })
    })
    console.log(results);
})







////EXPRESS ROUTES////

//express route to 'home'
app.get("/", function (request, result) {
    result.render('index');
})

////LISTEN ON PORT////

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("App running on port " + PORT + "!");
});