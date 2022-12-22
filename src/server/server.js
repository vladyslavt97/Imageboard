const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 3000 } = process.env;
const { uploader, fileUpload } = require('./file-upload');

const { 
    insertIntoImageboardDB, 
    selectAllDataFromImageboardDB } = require('./db.js');


app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
});
app.get("/images", (req, res) => {
    selectAllDataFromImageboardDB()
        .then((data) => {
            res.json(data.rows);
        })
        .catch(err=>{
            console.log('e: ', err);
        });
});

app.post('/add-image', uploader.single('filee'), fileUpload, (req, res) => {
    console.log('my log: ', req.body);
    console.log('file ?: ', res.locals.fileUrl);
    let url = res.locals.fileUrl;
    let title = req.body.filename;
    let username = 'user 1';
    let description = 'some info';
    insertIntoImageboardDB(url, username, title, description)
        .then((data) => {
            console.log(data.rows);
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
    if (req.file){
        res.json({success: true, fileUrl: res.locals.fileUrl});
    }else{
        res.json({success: false});
    }
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));