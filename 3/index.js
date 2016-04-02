/**
 * Created by konstantin on 2.4.16.
 */
'use strict';

var request = require("request");
var cheerio = require("cheerio"); //jQuery

request("http://fognews.ru/", (error, response, body) => {
   if(!error) {
       if(response.statusCode == 200) {
           var $ = cheerio.load(body);
           $("article .media-body").each(function(i){
              console.log($(this).find("em").eq(0).text() + " " +$(this).find("h4 a").eq(0).text());
              console.log($(this).find("a.hidden-xs.hidden-sm").text());
               console.log("Полная новость: " + $(this).find("h4 a").eq(0).attr("href") + "\n\n");

               return i<2; //show three last news
           });
       }
       else
           console.log("Ошибка! Код ответа сервера " + response.statusCode);
   }
    else
       console.log(error);
});