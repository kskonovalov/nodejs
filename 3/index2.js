/**
 * Created by konstantin on 2.4.16.
 */
'use strict';

var request = require("request");
var urlutils = require("url");
var cheerio = require("cheerio"); //jQuery
const argv = require('minimist')(process.argv.slice(2)); //for options

if(argv.w === undefined) {
    console.log("try 'node index2.js --w \"Чё как?\"'");
    argv.w = "Чё как?";
}

var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
var params = urlutils.parse(
    url, true
);
params.query = {
    key: 'trnsl.1.1.20160401T093117Z.adc1a98af5053afc.51879a870aa0cc07ca11fadbadae7ca3632dd9fa',
    lang: 'ru-en',
    text: argv.w
};
url = urlutils.format(params);

request(url, (error, response, body) => {
    if(!error) {
        if(response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log(`${argv.w} => ${result.text}`);
        }
        else
            console.log("Ошибка! Код ответа сервера " + response.statusCode);
    }
    else
        console.log(error);
});