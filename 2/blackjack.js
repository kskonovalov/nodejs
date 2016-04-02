'use strict';

const readline = require('readline'); //for input
const fs = require('fs'); //for file work
const argv = require('minimist')(process.argv.slice(2)); //for options

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(argv.log === undefined) {
    argv.log = "log.txt";
}

function getNaturalRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function logInFile(filename, text) {
    fs.appendFileSync(filename, text);
}

function whoWon(userScore, robotScore) {
    if(userScore > robotScore)
        gameResult = "win\n";
    else if(userScore < robotScore)
        gameResult = "lose\n";
    else gameResult = "draw\n";
    return gameResult;
}

console.log("BlackJack game. You and Robot have 0 points now\n");
//BlackJack Game
rl.setPrompt('Print "more" (or just press Enter), "done" or "exit" > ');
rl.prompt();
var maxScore = 21;
var score = 0, userScore = 0, robotScore = 0, gameResult, logText;
var activeGame = true;
rl.on('line', (line) => {
    switch(line) {
        case "done":
        case "exit":
            gameResult = `You result is "${userScore}", robot result is "${robotScore}"!\n`;
            gameResult = gameResult + whoWon(userScore, robotScore);
            logText = whoWon(userScore, robotScore);
            activeGame = false;
            break;
        case "more":
        default:
        score = getNaturalRandom(1,10);
        userScore += score;
        gameResult = `YOU: Added "${score}", you have "${userScore}" points now\n`;
        score = getNaturalRandom(1,10);
        robotScore += score;
        gameResult += `ROBOT: Added "${score}", robot have "${robotScore}" points now\n`;
        if(userScore > maxScore && robotScore > maxScore) {
            gameResult += "DRAW!";
            logText = "draw\n";
            activeGame = false;
        }
        else if(userScore > maxScore) {
            gameResult += "You lose..";
            logText = "lose\n";
            activeGame = false;
        }
        else if(robotScore > maxScore) {
            gameResult += "Robot lose!";
            logText = "win\n";
            activeGame = false;
        }
        else if(userScore == maxScore) {
            gameResult += "You won!!!";
            logText = "win\n";
            activeGame = false;
        }
        else if(robotScore == maxScore) {
            gameResult += "Robot won)";
            logText = "lose\n";
            activeGame = false;
        }
        break;
    }
    console.log(gameResult);

    if(!activeGame) {
        logInFile(argv.log,logText);
        process.exit(0);
    }

    rl.prompt();

}).on('close', () => {
    gameResult = `You killed me!\n`;
    console.log(gameResult);
    process.exit(0);
});

process.on('exit', (data) => {
    gameResult = "exited!!";
    console.log(gameResult);
});