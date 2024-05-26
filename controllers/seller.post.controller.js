const jwt = require('jsonwebtoken');
const db = require('../database/db');

const uniqid = require('uniqid');

const registerProperty = (req, res) => {
  console.log('Request body:', req.body);
  const { formData } = req.body;

  const {
    user_id,
    location,
    bedrooms,
    bathrooms,
    carParking,
    facilities,
    area,
    facing,
    floorNumber,
    openFor,
    city,
    rent

  } = formData;
  console.log(user_id,
    location,
    bedrooms,
    bathrooms,
    carParking,
    facilities,
    area,
    facing,
    floorNumber,
    openFor,
    city,
    rent);


  const post_id = uniqid(); // Generate unique post_id

  const insertHouseQuery = `
    INSERT INTO housedetails (post_id,user_id, location, bedrooms, bathrooms, carParking, facilities, area, facing, floorNumber, openFor, city,
      rent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(insertHouseQuery, [
    post_id,
    user_id,
    location,
    bedrooms,
    bathrooms,
    carParking,
    facilities,
    area,
    facing,
    floorNumber,
    openFor,
    city,
    rent

  ], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(201).json({
      message: 'Property registered successfully',

    });
  });
};


const getProperty = (req, res) => {
  console.log(req.params);
  const { user_id } = req.params;


  const getHouseQuery = `
    SELECT * FROM rent.housedetails WHERE user_id = ?
  `;

  db.query(getHouseQuery, [user_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(data);
    if (!data.length) {
      return res.status(404).json({ error: 'No properties found for this user' });
    }

    return res.status(200).json(data);
  });
};

const getIndivPost = (req, res) => {
  console.log(req.params);
  const { post_id } = req.params;
  console.log(post_id);

  const getHouseQuery = `
    SELECT * FROM rent.housedetails WHERE post_id = ?
  `;

  db.query(getHouseQuery, [post_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(data);
    if (!data.length) {
      return res.status(404).json({ error: 'No properties found for this user' });
    }

    return res.status(200).json(data);
  });
};


const updateProperty = (req, res) => {
  const { post_id } = req.params;

  const {
    location,
    bedrooms,
    bathrooms,
    carParking,
    facilities,
    area,
    facing,
    floorNumber,
    openFor,
    city,
    rent
  } = req.body;

  const updateHouseQuery = `
    UPDATE housedetails
    SET location = ?, bedrooms = ?, bathrooms = ?, carParking = ?, facilities = ?,
        area = ?, facing = ?, floorNumber = ?, openFor = ?, city = ?, rent = ?
    WHERE post_id = ?
  `;

  db.query(
    updateHouseQuery,
    [
      location,
      bedrooms,
      bathrooms,
      carParking,
      facilities,
      area,
      facing,
      floorNumber,
      openFor,
      city,
      rent,
      post_id
    ],
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      return res.status(200).json({ message: 'Property updated successfully' });
    }
  );
};



const deleteProperty = (req, res) => {
  const { post_id } = req.params;
  console.log(post_id);

  const deleteHouseQuery = `
    DELETE FROM housedetails WHERE post_id = ?
  `;

  db.query(deleteHouseQuery, [post_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json({ message: 'Property deleted successfully' });
  });
};





module.exports = { registerProperty, getProperty, updateProperty, deleteProperty, getIndivPost };
