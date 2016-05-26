const express = require('express');
const Users = require('../models/userModel.js');
const Evaluations = require('../models/evaluationModel.js');
const Accomodations = require('../models/accomodationModel.js');

const userRoute = new express.Router();
const userModel = new Users(redisClient);
const accomodationModel = new Accomodations(redisClient);
const evaluationModel = new Evaluations(redisClient);

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
