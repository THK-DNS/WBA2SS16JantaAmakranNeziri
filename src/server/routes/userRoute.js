const express = require('express');
const Users = require('../models/userModel.js');
const Evaluations = require('../models/evaluationModel.js');
const Accommodations = require('../models/accommodationModel.js');

const userRoute = new express.Router();

const userModel = new Users();
const accommodationModel = new Accommodations();
const evaluationModel = new Evaluations();

userRoute.route('/')
.get((req, res) => {
    // Get all users
    userModel.getUsers().then((users) => {
      res.json(users);
      res.end();
    });
  })
.post((req, res) => {
  userModel.addUser(req.body).then((user) => {
    res.json(user);
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
    userModel.getUserById(req.params.id).then((user) => {
      res.json(user);
      res.end();
    });
  })
.post((req, res) => {
  res.end();
})
.put((req, res) => {
  userModel.updateUser(req.params.id, req.body).then(() => {
    res.json(req.body);
    res.end();
  }).catch(() => {
    res.status(404);
    res.end();
  });
})
.delete((req, res) => {
  userModel.removeUser(req.params.id).then(() => {
    res.json(data);
    res.end();
  }).catch(() => {
    res.status(404);
    res.end();
  });
});

userRoute.route('/:id/accommodations')
.get((req, res) => {
    // get user by id
    accommodationModel.getAccommodationsByOwner(req.params.id).then((data) => {
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
    evaluationModel.getEvaluationsByWriter(req.params.id).then((data) => {
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
