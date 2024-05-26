const db = require('../database/db');

const getPropertiesByCity = (req, res) => {
    const { city } = req.params;


    const query = 'SELECT * FROM housedetails WHERE city = ?';
    db.query(query, [city], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
};

const getOwnerDetails = (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT firstname, lastname, email, phone FROM user_table WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        return res.status(200).json(results[0]);
    });
};

// const likePost = (req, res) => {
//     const { post_id, user_id } = req.body;

//     const checkLikeQuery = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
//     db.query(checkLikeQuery, [post_id, user_id], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         if (data.length) {
//             return res.status(409).json({ message: 'User already liked this post!' });
//         }

//         const insertLikeQuery = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)';
//         db.query(insertLikeQuery, [post_id, user_id], (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }

//             const updateLikeCountQuery = 'UPDATE housedetails SET likeCount = likeCount + 1 WHERE post_id = ?';
//             db.query(updateLikeCountQuery, [post_id], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }

//                 const fetchLikeCountQuery = 'SELECT likeCount FROM housedetails WHERE post_id = ?';
//                 db.query(fetchLikeCountQuery, [post_id], (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).json({ error: 'Internal Server Error' });
//                     }

//                     return res.status(200).json({ likeCount: data[0].likeCount });
//                 });
//             });
//         });
//     });
// };





module.exports = {
    getPropertiesByCity, getOwnerDetails
};
