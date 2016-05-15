const express = require('express');
const Users = require('../models/userModel.js');

const userRoute = new express.Router();
const userModel = new Users(process.env.DATABASE_URL);

userRoute.route('/')
  .get((req, res) => {
  	// Get all users
  	userModel.getUsers((data) => {
  		res.json(data);
  		res.end();
  	});
  })
  .post((req, res) => {
    userModel.addUser(req.body, (err) => {
  		if(err) {
  			console.log(err);
  		}

  		res.end();
  	});
  })
  .put((req, res) => {
    res.end();
  })
  .delete((req, res) => {
    res.end();
});

userRoute.route('/:id')
  .get((req, res) => {
    // get user by id
    userModel.getUserById(req.params.id, (data) => {
  		res.json(data);
  		res.end();
  	});
  })
  .post((req, res) => {
    res.end();
  })
  .put((req, res) => {
    userModel.updateUser(req.params.id, req.body, (err) => {
  		if(err) {
  			console.log(err);
  		}

  		res.end();
  	});
  })
  .delete((req, res) => {
    userModel.removeUser(req.params.id, (err) => {
  		if(err) {
  			console.log(err);
  		}

  		res.end();
  	});
});


module.exports = userRoute;
