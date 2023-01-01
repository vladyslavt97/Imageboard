const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
const { PORT = 3000 } = process.env;
const { uploader, fileUpload } = require('./file-upload');

const { 
    insertIntoImageboardDB, 
    selectAllDataFromImageboardDB,
    selectImageFromImageboardBasedOnID,
    selectAllCommentsFromCommentsDBBasedOnId } = require('./db.js');


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
    console.log('got here');
    const imageId = req.params.id;
    console.log('imageId: ', imageId);

    selectImageFromImageboardBasedOnID(imageId)
        .then((alldata) => {
            console.log('myData: ', alldata.rows[0]);
            res.json({success: true, myData: alldata.rows[0]});
            // return selectAllCommentsFromCommentsDBBasedOnId();
        })
        // .then((data) => {
        //     const comments = data.rows;
        //     res.json({success: true, theComments: data.rows});
        //     console.log('comments: ', comments);
        // })
        .catch(err=>{
            console.log('error..: ', err);
            res.json({success: false});
        });
});

app.post('/add-image', uploader.single('filee'), fileUpload, (req, res) => {
    let url = res.locals.fileUrl;
    let title = req.body.filename;
    let description = req.body.description;
    let username = req.body.username;
    // if (title !== "", description !== "", username !== ""){
    insertIntoImageboardDB(url, username, title, description)
        .then((data) => {
            if (req.file){
                console.log('myObj: ', data.rows[0]);
                res.json({success: true, myObj: data.rows[0]});
            }else{
                res.json({success: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
    // } else {
    //     let showError = true;
    // }
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));