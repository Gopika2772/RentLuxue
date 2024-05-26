const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const uniqid = require('uniqid');



const sellerRegister = (req, res) => {
  const { firstname, lastname, email, password, phone, role } = req.body;
  console.log(req.body);

  // Check if user with the same email already exists
  const checkUserQuery = "SELECT * FROM user_table WHERE email = ?";
  db.query(checkUserQuery, [email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user_id = uniqid();
    console.log(user_id);

    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO user_table (user_id, firstname, lastname, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [user_id, firstname, lastname, email, hashedPassword, phone, role];
    db.query(insertUserQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          user_id: user_id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          role: role, // Include role in the JWT payload
        },
        process.env.SECRET,
        {
          expiresIn: 604800, // Token expires in 7 days
        }
      );

    
      return res.json({
        token: token,
        user_id: user_id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        role: role, 
      });
    });
  });
};


const sellerLogin = (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  const checkUserQuery = "SELECT * FROM user_table WHERE email = ?";
  db.query(checkUserQuery, [email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length == 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = data[0];


    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }


    const token = jwt.sign(
      {
        user_id: user.user_id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: 604800,
      }
    );


    return res.json({
      token: token,
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      role: user.role, // Include role in the response
    });
  });
};


module.exports = { sellerRegister, sellerLogin };