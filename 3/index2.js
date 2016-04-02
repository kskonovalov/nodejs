/**
 * Created by konstantin on 2.4.16.
 */
'use strict';

var request = require("request");
var urlutils = require("url");
var cheerio = require("cheerio"); //jQuery
const argv = require('minimist')(process.argv.slice(2)); //for options
const express = require("express");
const app = express();


var textToTranslate;

app.get('/', (req, res) => {
    if(req.query.text !== undefined) {
        textToTranslate = req.query.text;
    }
    else
        textToTranslate = "Чё как?";

    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    var params = urlutils.parse(
        url, true
    );
    params.query = {
        key: 'trnsl.1.1.20160401T093117Z.adc1a98af5053afc.51879a870aa0cc07ca11fadbadae7ca3632dd9fa',
        lang: 'ru-en',
        text: textToTranslate
    };
    url = urlutils.format(params);

    request(url, (error, response, body) => {
        if(!error) {
            if(response.statusCode == 200) {
                var result = JSON.parse(body);
                res.send(`${textToTranslate} => ${result.text}`);
            }
            else
                res.send("Ошибка! Код ответа сервера " + response.statusCode);
        }
        else
            res.send("Ошибка! " + error);
    });

});


app.listen(5000);