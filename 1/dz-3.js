'use strict';

const colors = require('colors'); //colored text
const axel = require('axel'); //painting in console
const player = require('play-sound')() //mp3 player


// Clear the terminal 
axel.clear();

//print colored text
console.log("hrm, it's red & underlined".underline.red);
console.log("YAHOOOOOOOOOOOOOOOOO".rainbow);
console.log("Hello, GeekBrains!".trap);

//draw box with background
axel.bg(47,21,31);
axel.box(2,2,30,10);

//draw text with bg
axel.bg(0,181,75);
console.log("text with bg only");
axel.text(5,5,"text with bg and position");

//restore console view
axel.cursor.restore();

//play sound
player.play('foo.mp3', function(err){}) // works on my Ubuntu 14.04


console.log("\n");