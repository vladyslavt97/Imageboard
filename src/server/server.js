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
    selectAllCommentsFromCommentsDBBasedOnId,
    insertCommentToCommentsDBBasedOnId,
    selectImageAndCommentBasedOnID } = require('./db.js');


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
    selectImageFromImageboardBasedOnID(imageId)
        .then((alldata) => {
            res.json({success: true, myData: alldata.rows[0]});
        })
        .catch(err=>{
            console.log('error..: ', err);
            res.json({success: false});
        });
});

app.get("/comment/:id", (req,res) => {
    const commentId = req.params.id;
    selectAllCommentsFromCommentsDBBasedOnId(commentId)
        .then((data) => {
            const comments = data.rows;
            res.json({success: true, theComments: comments});
        })
        .catch(err=>{
            console.log('error of comments get..: ', err);
            res.json({success: false});
        });
});
// app.get("/image/:id", (req,res) => {
//     console.log('got here');
//     console.log('imageId: ', req.params);
//     const imageId = req.params.id;

//     selectImageAndCommentBasedOnID(imageId)
//         .then((alldata) => {
//             console.log('myData: ', alldata.rows);
//             res.json({success: true, myData: alldata.rows[0]});
//         })
//         .catch(err=>{
//             console.log('error..: ', err);
//             res.json({success: false});
//         });
// });


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


//post for inserting a comment
app.post('/comment', (req, res) => {
    const { comment, usernamecomment, imageid } = req.body;
    insertCommentToCommentsDBBasedOnId(comment, usernamecomment, imageid)
        .then((data) => {
            res.json({ success: true, myComment: data.rows[0]});
        })
        .catch(err => {
            console.log('err in POST insert comment: ', err);
            res.json({success: false});
        });
});
// On the server, you will have to make sure that you are passing the value returned by express.json() to app.use so that the body of the POST request will be parsed and req.body will be available in your route.

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));