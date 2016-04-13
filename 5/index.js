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

//cookies work
const cookieParser = require("cookie-parser");
app.use(cookieParser("SucMdMP5TN")); //secret string for cookies

//sessions
const session = require("cookie-session");
app.use(session({keys: ['6lP2z2QOtG']}));

//view
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//auth
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
//hash
const hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
};

const localStrategy = require("passport-local").Strategy;
passport.use(new localStrategy((username, password, done) => {
    if(username != "admin")
        return done(null, false);
    if(password != "admin")
        return done(null, false);
    app.locals.username = username;
    return done(null, {username: "admin"});
}));


passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((id, done) => {
    done(null, {username:id});
});

const auth = passport.authenticate("local", {
    failureRedirect: "/user"
});


//user
app.get("/user", (req, res) => {
    res.render('login', {
        title: "Авторизация",
        partials: {
            header: "header"
        }
    });
});
app.post("/user", auth, (req, res) => {
    res.redirect("/");
});

const mustBeAuthentificated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/user");
    }
};

app.get("/logout", (req, res, next) => {
    req.logout();
    app.locals.username = null;
    app.locals.isAdmin = null;
    res.clearCookie("auth");
    res.redirect("/");
});





const VKontakteStrategy = require("passport-vkontakte").Strategy;
passport.use(new VKontakteStrategy({
        clientID:     5412989, // VK.com docs call it 'API ID'
        clientSecret: "U03CfCA12o6Pbrbu7uJu",
        callbackURL:  "http://localhost:5000/auth/vkontakte/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        app.locals.username = profile.displayName;
        app.locals.isAdmin = false;
        return done(null, {username: profile.displayName});
    }
));

app.get('/auth/vkontakte',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });








app.all("/create", mustBeAuthentificated);
app.all("/edit/*", mustBeAuthentificated);
app.all("/delete", mustBeAuthentificated);


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

//creating article
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


//view article
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

//edit article
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

//deleting article
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