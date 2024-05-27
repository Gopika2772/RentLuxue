const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "bl64f08yn5ybfwpaxjrj-mysql.services.clever-cloud.com",
    database: "bl64f08yn5ybfwpaxjrj",
    user: "uvbkybbay37tbeiw",
    password: "1iN7zP5CQ4jGPeUXwCP0",
});
module.exports = db


// const mysql = require("mysql2");
// const db = mysql.createConnection({
//     host: "localhost",
//     database: "rent",
//     user: "root",
//     password: "Gopika01#",
// });

db.connect((err) => {
    if (err) {
        console.log("db not connected");
    }
    else {
        console.log("mysql connected");
    }
})
module.exports = db;