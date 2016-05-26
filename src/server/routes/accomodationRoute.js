const express = require('express');
const Accomodations = require('../models/accomodationModel.js');
const Evaluations = require('../models/evaluationModel.js');

const accomodationRoute = new express.Router();
const accomodationModel = new Accomodations(process.env.DATABASE_URL);
const evaluationModel = new Evaluations(process.env.DATABASE_URL);

accomodationRoute.route('/')
.get((req, res) => {
    // Get all
    accomodationModel.getAccomodations((data) => {
      res.json(data);
      res.end();
    });
  })
.post((req, res) => {
    // Add row
    accomodationModel.addAccomodation(req.body, (err) => {
      if (err) {
        console.log(err);
      }

      res.end();
    });
  })
.put((req, res) => {
    // Update whole table
    res.end();
  })
.delete((req, res) => {
    // Drop table
    res.end();
  });

accomodationRoute.route('/:id')
.get((req, res) => {
  accomodationModel.getAccomodationsById(req.params.id, (data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  res.end();
})
.put((req, res) => {
  accomodationModel.updateAccomodation(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    }

    res.end();
  });
})
.delete((req, res) => {
  accomodationModel.removeAccomodation(req.params.id, (err) => {
    if (err) {
      console.log(err);
    }

    res.end();
  });
});

accomodationRoute.route('/:id/evaluations')
.get((req, res) => {
  evaluationModel.getEvaluationsByAccomodation(req.params.id, (data) => {
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

module.exports = accomodationRoute;
