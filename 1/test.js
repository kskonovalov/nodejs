'use strict';
/*
const argv = require('minimist')(process.argv.slice(2));
const util = require('util');

var bla="blabla";

console.log(argv);

console.log(process.env.NODE_ENV);

console.error(bla);
console.log(bla);

var object = {
x: 3,
y: 5,
a: {
b: {
c: {
z: 3}}}
};

console.log(util.inspect(object, {depth: null}));




const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function(command) {
	console.log('command', command);
	rl.close();
});

rl.question("What's your name? ", (answer) => {
	console.log(`Hello, ${answer}`);
	rl.close();
});

const fs = require('fs');


fs.exists("foo1a.mp3", function(err, data) {
	console.log(err);
});


const exist = fs.existsSync("foo.mp3");

console.log(exist);

fs.readFile('index.js', (err, data) => {
	if(err) throw err;
	
	console.log(data.toString());
});

*/

try {
	console.log("1");
	throw new Error('Ошибка');
	console.log("2");
} catch(err) {
	console.error(err);
}