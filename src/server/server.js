const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 3000 } = process.env;

const { 
    // insertIntoImageboardDB, 
    selectAllDataFromImageboardDB } = require('./db.js');


app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
});
app.get("/test", (req, res) => {
    selectAllDataFromImageboardDB()
        .then((data) => {
            console.log('data', data.rows);
            res.json(data.rows);
        })
        .catch(err=>{
            console.log('e: ', err);
        });
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));

// let url = `https://spiced.space/mint/imageboard_1/`;
// let username = `Vlad`;
// let title = 'TEST';
// let description = 'some stuff';
// console.log('got here');
// insertIntoImageboardDB(url, username, title, description)