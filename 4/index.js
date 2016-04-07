/**
 * Created by konstantin on 7.4.16.
 */
'use strict';

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('Hello, Konstantin!');
});

app.listen(5000);