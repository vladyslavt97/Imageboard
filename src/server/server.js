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
    deleteResponseBasedOnId,
    deleteCommentsForImageIdFromDB,
    deleteImageFromImagesDB,
    insertResponseBasedOnId,
    selectAllFromResponseBasedOnID } = require('./db.js');


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

//reply get (to see all replies)
app.get("/reply/:id", (req,res) => {
    const commentid = req.params.id;
    // console.log('commentid in get: ', commentid);
    selectAllFromResponseBasedOnID(commentid)
        .then((data) => {
            const replies = data.rows;
            // console.log('replies: ',replies);
            res.json({success: true, theReplies: replies});
        })
        .catch(err=>{
            console.log('error of replies GET..: ', err);
            res.json({success: false});
        });
});

//                              POST                            //
app.post('/add-image', uploader.single('filee'), fileUpload, (req, res) => {
    let url = res.locals.fileUrl;
    let title = req.body.filename;
    let description = req.body.description;
    let username = req.body.username;
    // if (title !== "", description !== "", username !== ""){
    insertIntoImageboardDB(url, username, title, description)
        .then((data) => {
            if (req.file){
                res.json({success: true, myObj: data.rows});
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
//
//post for inserting a comment
app.post('/reply', (req, res) => {
    console.log('re.b:', req.body);
    const { reply, usernamereply, commentid, imageid } = req.body;
    insertResponseBasedOnId(reply, usernamereply, commentid, imageid)
        .then((data) => {
            res.json({ success: true, myReply: data.rows[0]});
        })
        .catch(err => {
            console.log('err in POST insert reply: ', err);
            res.json({success: false});
        });
});


//                  DELETE                  //
//deleteResponseBasedOnId
app.delete('/image/:id', (req, res) => {
    const imageid = req.params.id;
    // const { commentid } = req.body;
    console.log('req.params for deletion: ', imageid);  
    deleteResponseBasedOnId(imageid)
        .then(() => {
            console.log('deleted from response');
            return deleteCommentsForImageIdFromDB(imageid);
        })
        .then(() => {
            console.log('deleted from comments');
            return deleteImageFromImagesDB(imageid);
        })
        .then((data) => {
            res.json(data);
            console.log('deleted from images');
        })
        .catch(err => {
            console.log('err in delete queries: ', err);
        });
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}...`));