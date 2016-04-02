'use strict';

const fs = require('fs'); //for file work
const argv = require('minimist')(process.argv.slice(2)); //for options

if(argv.log === undefined) {
    argv.log = "log.txt";
}

var buf=fs.readFileSync(argv.log);
var wins = 0, loses = 0, draws = 0, all = 0, winsRatio, losesRatio, drawsRatio,
    last = "", winStreak = 0, loseStreak = 0, drawStreak = 0, curStreak = 0;

buf.toString().split(/\n/).forEach(function(line){
    if(line == "win") {
        wins++;
        if(last == "" || last == "win") {
            curStreak++;
        }
        else {
            curStreak = 1;
        }
        if(curStreak > winStreak)
            winStreak = curStreak;
        last = "win";
    }
    else if(line == "lose") {
        loses++;
        if(last == "" || last == "lose") {
            curStreak++;
        }
        else {
            curStreak = 1;
        }
        if(curStreak > loseStreak)
            loseStreak = curStreak;
        last = "lose";
    }
    else if(line == "draw") {
        draws++;
        if(last == "" || last == "draw") {
            curStreak++;
        }
        else {
            curStreak = 1;
        }
        if(curStreak > drawStreak)
            drawStreak = curStreak;
        last = "draw";
    }
    else {
        return;
    }
    all++;
});
winsRatio = (wins/all).toFixed(2);
losesRatio = (loses/all).toFixed(2);
drawsRatio = (draws/all).toFixed(2);
console.log(`Wins: ${wins} (ratio: ${winsRatio}), loses: ${loses} (ratio: ${losesRatio}), draws: ${draws} (ratio: ${drawsRatio}),  total: ${all}\n`);
console.log(`Max wins streak: ${winStreak}; Max loses streak: ${loseStreak}; Max draws streak: ${drawStreak}\n`);