/// Dependencies
// =============================================================

////REQUEST////
//require request
const request = require("request");

////CHEERIO////
//require cheerio
const cheerio = require("cheerio");

////Database////
const db = require("../models");
module.exports = function (app) {

    //express route to 'home' with auto scrapper
    app.get("/", function (req, res) {

        ///SCRAPING TEST////
        const uri = "https://www.entrepreneur.com/topic/coding"
        request(uri, (error, response, html) => {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            const $ = cheerio.load(html);

            const results = {};

            $('.pl').each((i, element) => {
                results.headline = $(element).find(".block").find("h3").attr("data-ga-action", "headline").text();
                results.summary = $(element).find(".deck").text()
                results.url = "https://www.entrepreneur.com/" + $(element).find(".block").find("h3").children().attr("href");
                results.photoUrl = $(element).find(".hero").children().find("img").attr("src");
                results.byline = $(element).find(".byline").find(".name").text();

                //  Create a new Article using the `result` object built from scraping
                db.Article.create(results)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        // console.log(i, dbArticle);
                   
                    })
                    .catch(function (err) {
                        if (err.code === 11000) {
                            // console.log(err.errmsg)
                        }
                        else {
                            // If an error occurred, send it to the client
                            return res.json(err);

                        }
                    });
            });
        });
        res.redirect('/articles');
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({})
            .populate("note")
            .then(function (dbArticle) {
                console.log("refresh articles with notes",dbArticle);

                res.render("index", { dbArticle })
                // res.json(notes);
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });


    });

    // Route for saving a new Note to the db and associating it with an article
    app.post("/submit", function (req, res) {
        // console.log("post passed")
        console.log(req.body.queryId)
        // Create a new Note in the db
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one User (there's only one) and 
                //push the new Note's _id to the User's `notes` array
                // { new: true } tells the query that we want it to return the updated User 
                //-- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another 
                //`.then` which receives the result of the query
               return db.Article.findOneAndUpdate({
                    id: req.body.queryId
                }, {
                        $push: { note: dbNote._id }
                    }, { new: true });
            }).then(function (dbPush) {
                console.log(dbPush)
                // If we were able to successfully update an Article, send it back to the client
                res.redirect("/articles");
            })

            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });

    })



    // Route for retrieving all Notes from the db
    app.delete("/remove", function (req, res) {
        // Find all Notes
    //    console.log(req.body.queryID)

    db.Note.deleteOne({
         id : req.body.queryId 
        
      }).then(function (dbDelete) {
        console.log(dbDelete)
        // If we were able to successfully update an Article, send it back to the client
        res.redirect("/articles");
    })

    .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
    });
    });

};

