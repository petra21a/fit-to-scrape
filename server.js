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

////MONGOOSE////
//require mongoose
const mongoose = require("mongoose");

//require models for mongoose
const db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/fit-to-scrape", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);


////EXPRESS ROUTES////

// Import routes and give the server access to them.
// const route = require("./routes/article-routes.js");
// app.use(route);

require("./routes/article-routes.js")(app);


////LISTEN ON PORT////

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("App running on port " + PORT + "!");
});