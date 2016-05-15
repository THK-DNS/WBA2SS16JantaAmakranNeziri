const express = require('express');
const Users = require('../models/userModel.js');
const Evaluations = require('../models/evaluationModel.js');
const Accomodations = require('../models/accomodationModel.js');

const userRoute = new express.Router();
const userModel = new Users(process.env.DATABASE_URL);
const accomodationModel = new Accomodations(process.env.DATABASE_URL);
const evaluationModel = new Evaluations(process.env.DATABASE_URL);

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

userRoute.route('/:id/accomodations')
  .get((req, res) => {
    // get user by id
    accomodationModel.getAccomodationsByOwner(req.params.id, (data) => {
  		res.json(data);
  		res.end();
  	});
  })
  .post((req, res) => {
    res.end();
  })
  .put((req, res) => {
    res.end();
  })
  .delete((req, res) => {
  	res.end();
});

userRoute.route('/:id/evaluations')
  .get((req, res) => {
    // get user by id
    evaluationModel.getEvaluationsByWriter(req.params.id, (data) => {
  		res.json(data);
  		res.end();
  	});
  })
  .post((req, res) => {
    res.end();
  })
  .put((req, res) => {
    res.end();
  })
  .delete((req, res) => {
  	res.end();
});

module.exports = userRoute;
