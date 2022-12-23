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
    FROM images;`);
};