/**
 * Created by konstantin on 7.4.16.
 */
'use strict';

const express = require("express");
const app = express();
const templating = require('consolidate');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
const request = require("request");
const cheerio = require("cheerio"); //jQuery
const iconv = require("iconv");


app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.get("/", (req, res) => {
    res.render('main', {
        title: 'Что-то странное',
        partials: {
            header: "header"
        }
    });
});

app.post('/', (req, res) =>{

    var quotes = [];
    request({
        uri: "http://bash.im/abyssbest",
        encoding: 'binary'
    }, (error, response, body) => {
        if(!error) {
            if(response.statusCode == 200) {
                body = new Buffer(body, 'binary');
                var conv = new iconv.Iconv('windows-1251', 'utf8');
                body = conv.convert(body).toString();

                var $ = cheerio.load(body);
                $(".quote").each(function(i){
                    quotes.push($(this).find(".text").eq(0).text());
                    return i<req.body.count-1; //show N last news
                });

                res.render('main', {
                    title: 'Что-то смешное',
                    count: req.body.count,
                    quotes: quotes,
                    partials: {
                        header: "header"
                    }
                });

            }
            else
                console.log("Ошибка! Код ответа сервера " + response.statusCode);
        }
        else
            console.log(error);
    });
});

app.listen(5000);