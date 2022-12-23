const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 3000 } = process.env;
const { uploader, fileUpload } = require('./file-upload');

const { 
    insertIntoImageboardDB, 
    selectAllDataFromImageboardDB,
    selectImageFromImageboardBaseOnID } = require('./db.js');


app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.get("/image/:id", (req,res) => {
    const imageId = req.params.id;
    console.log('imageId: ', imageId);
    selectImageFromImageboardBaseOnID(imageId)
        .then((data) => {
            console.log('file: ', req.file);
            if (req.file){
                res.json({success: true, myData: data});
            }else{
                res.json({success: false});
            }
        })
        .catch(err=>{
            console.log('error: ', err);
        });
});

app.post('/add-image', uploader.single('filee'), fileUpload, (req, res) => {
    // console.log('my log: ', req.body);
    // console.log('file ?: ', res.locals.fileUrl);
    let url = res.locals.fileUrl;
    let title = req.body.filename;
    let username = req.body.description;
    let description = req.body.username;
    insertIntoImageboardDB(url, username, title, description)
        .then((data) => {
            console.log(data.rows);
            if (req.file){
                res.json({success: true, myObj: data.rows[0]});
            }else{
                res.json({success: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));