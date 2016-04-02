'use strict';

const ansi = require('ansi'); //родной для ноды
//import ansi from 'ansi'; 
const cursor = ansi(process.stdout);

cursor.beep();
console.log("beeped?");

const express = require('express');
cursor.red().bg.grey().write('Домашнее задание очень веселое').beep(); 