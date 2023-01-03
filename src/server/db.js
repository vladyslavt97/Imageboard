require('dotenv').config();
const {DATABASE_URL} = process.env;
const spicedPg = require('spiced-pg');
// console.log('db url: ', DATABASE_URL);
const db = spicedPg(DATABASE_URL);

module.exports.insertIntoImageboardDB = (url, username, title, description) =>{
    return db.query(`INSERT INTO images (url, username, title, description) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [url, username, title, description]);
};

module.exports.selectAllDataFromImageboardDB = () =>{
    return db.query(`SELECT * 
    FROM images 
    ORDER BY images.created_at DESC;`);
    //LIMIT 6
};

module.exports.selectImageFromImageboardBasedOnID = (imageId) =>{
    return db.query(`SELECT * 
    FROM images
    WHERE id = $1;`, [imageId]);
};

module.exports.selectAllCommentsFromCommentsDBBasedOnId = (commentId) =>{
    return db.query(`SELECT * 
    FROM comments
    WHERE image_id = $1;`, [commentId]);
};

module.exports.insertCommentToCommentsDBBasedOnId = (comment, usernamecomment, imageid) =>{
    return db.query(`INSERT INTO comments (comment, username, image_id) 
    VALUES ($1, $2, $3) RETURNING *;`, [comment, usernamecomment, imageid]);
};


//queries to delete the image from images AND comments DBs
//delete images
module.exports.deleteImageFromImagesDB = (imageid) => { 
    return db.query(`
        DELETE FROM images 
        WHERE id = $1;`, [imageid]);
};

//delete from comments
module.exports.deleteCommentsForImageIdFromDB = (imageid) => {
    return db.query(`
        DELETE FROM comments 
        WHERE image_id = $1;`, [imageid]);
};

//delete from response
module.exports.deleteResponseBasedOnId = (imageid) => {
    return db.query(`
        DELETE FROM response 
        WHERE image_id = $1;`, [imageid]);
};


//2 queries for response
//select
module.exports.selectAllFromResponseBasedOnID = (replyId) =>{
    return db.query(`SELECT * 
    FROM response
    WHERE id = $1;`, [replyId]);
};

module.exports.insertResponseBasedOnId = (reply, usernamereply, commentid) =>{
    return db.query(`INSERT INTO response (reply, username, comment_id)
    VALUES ($1, $2, $3) RETURNING *;`, [reply, usernamereply, commentid]);
};