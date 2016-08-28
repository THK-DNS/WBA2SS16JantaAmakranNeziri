const express = require('express');
const Users = require('../models/userModel.js');

const userModel = new Users();
const authRoute = new express.Router();

authRoute.route('/signin')
.post((req, res) => {
	userModel.isValidLogin(req.body.username, req.body.password).then((user) => {
    	res.json(user);
    	res.end();
  	}).catch(() => {
      res.status(422);
    	res.send('Invalid login.');
  	});
});

authRoute.route('/signup')
.post((req, res) => {
	userModel.addUser(req.body).then((user) => {
    res.json(user);
    res.end();
  });
});


module.exports = authRoute;