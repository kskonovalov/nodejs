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
    crud.save(0, req.body.title, req.body.content, (err, id) => {
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
    crud.view(req.params.id, (err, article) => {
        if(!err) {
            res.render('article', {
                title: article[0].title,
                article: article[0],
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

//creating articles
app.get("/edit/:id", (req, res) => {
    crud.edit(req.params.id, (err, article) => {
        if(!err) {
            res.render('create', {
                title: article[0].title,
                article: article[0],
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
app.post('/edit/:id', (req, res) =>{
    crud.save(req.body.id, req.body.title, req.body.content, (err, id) => {
        if(id) {
            res.redirect("/view/" + id);
        }
        else {
            res.redirect("/create");
        }
    });
});

//deleting articles
app.get("/delete/:id", (req, res) => {
    crud.delete(req.params.id, (err) => {
        if(!err) {

        }
        else {

        }
        res.redirect("/");
    });
});



app.listen(5000);