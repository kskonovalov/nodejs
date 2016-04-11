/**
 * Created by konstantin on 11.4.16.
 */

'use strict';

//database
const dbConfig = require ("./config/config.js");
let tableName = "articles";
const crud = require("./models/crud")(dbConfig, tableName);

//express
const express = require("express");
const app = express();
const templating = require('consolidate');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
const request = require("request");

//view
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//show all articles
app.get("/", (req, res) => {
    crud.all((err, rows) => {
        res.render('index', {
            title: 'Что-то странное',
            rows: rows,
            partials: {
                header: "header"
            }
        });
    });
});

//creating articles
app.get("/create", (req, res) => {
    res.render('create', {
        title: 'Создание статьи',
        partials: {
            header: "header"
        }
    });
});

app.post('/create', (req, res) =>{
    crud.create(req.body.title, req.body.content, (err, id) => {
        if(id) {
                res.redirect("/view/" + id);
            }
        else {
            res.redirect("/create");
        }
    });
});


//creating articles
app.get("/view/:id", (req, res) => {
    crud.view(req.body.id, (err, article) => {
        if(!err) {
            res.render('article', {
                title: article.title,
                article: article,
                partials: {
                    header: "header"
                }
            });
        }
        else {
            res.render('index', {
                title: "nothing found",
                partials: {
                    header: "header"
                }
            });
        }
    });
});



app.listen(5000);