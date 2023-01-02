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
    ORDER BY images.created_at DESC
    LIMIT 6;`);
};

module.exports.selectImageFromImageboardBasedOnID = (imageId) =>{
    return db.query(`SELECT * 
    FROM images
    WHERE id = $1;`, [imageId]);
};

///combine two queries get image and get comment
// module.exports.selectImageAndCommentBasedOnID = (imageId) =>{
//     return db.query(`SELECT * FROM images 
//                     FULL OUTER JOIN comments 
//                     ON images.id = comments.image_id WHERE images.id = $1;`, [imageId]);
// };
// January (Part 4 and 5)
//only two new queries?

// a new query for getting all the comments for a particular picture (based on ID)
module.exports.selectAllCommentsFromCommentsDBBasedOnId = (commentId) =>{
    return db.query(`SELECT * 
    FROM comments
    WHERE image_id = $1;`, [commentId]);
};

// a new query for inserting a comment for a picture with specific ID (foreign key?)
module.exports.insertCommentToCommentsDBBasedOnId = (comment, usernamecomment, imageid) =>{
    return db.query(`INSERT INTO comments (comment, username, image_id) 
    VALUES ($1, $2, $3) RETURNING *;`, [comment, usernamecomment, imageid]);
};


//queries to delete the image from images AND comments DBs
//delete images
module.exports.deleteImageFromImagesDB = (imageID) => { 
    return db.query(`
        DELETE FROM images 
        WHERE id = $1;`, [imageID]);
};

//delete from comments
module.exports.deleteCommentsForImageIdFromDB = (imageID) => {
    return db.query(`
        DELETE FROM comments 
        WHERE image_id = $1;`, [imageID]);
};

