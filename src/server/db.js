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
};

module.exports.selectImageFromImageboardBasedOnID = (imageId) =>{
    return db.query(`SELECT * 
    FROM images
    WHERE id = $1;`, [imageId]);
};


// January (Part 4 and 5)
//only two new queries?

// a new query for getting all the comments for a particular picture (based on ID)
module.exports.selectAllCommentsFromCommentsDBBasedOnId = (imageId) =>{
    return db.query(`SELECT * 
    FROM comments
    WHERE id = $1;`, [imageId]);
};

// a new query for inserting a comment for a picture with specific ID (foreign key?)
module.exports.insertCommentToCommentsDBBasedOnId = (comment, username, id) =>{
    return db.query(`INSERT INTO comments (comment, username, id) 
    VALUES ($1, $2, $3) RETURNING *;`, [comment, username, id]);
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

