require("dotenv").config()

const express = require("express");
const app = express();
const mongodb = require("./database/");
const baseRouter = require("./routes/");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/", baseRouter);


const port = process.env.PORT || 3000;
mongodb.initClient((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and App lintening on port: ${port}`)
    }
})