const express = require('express');
const Users = require('../models/userModel.js');

const userModel = new Users();
const authRoute = new express.Router();

authRoute.route('/login')
.post((req, res) => {
	userModel.isValidLogin(req.body.username, req.body.password).then((user) => {
    	res.send('Valid');
  	}).catch(() => {
    	res.send('Invalid login.');
  	});
});


module.exports = authRoute;