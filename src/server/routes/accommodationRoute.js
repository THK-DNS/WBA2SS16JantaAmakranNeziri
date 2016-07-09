const express = require('express');
const Accommodations = require('../models/accommodationModel.js');
const Evaluations = require('../models/evaluationModel.js');

const accommodationRoute = new express.Router();

const accommodationModel = new Accommodations();
const evaluationModel = new Evaluations();

accommodationRoute.route('/')
.get((req, res) => {
    // Get all
    accommodationModel.getAccommodations().then((data) => {
      res.json(data);
      res.end();
    });
  })
.post((req, res) => {
    // Add row
    accommodationModel.addAccommodation(req.body).then((data) => {
      res.json(data);
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

accommodationRoute.route('/:id')
.get((req, res) => {
  accommodationModel.getAccommodationsById(req.params.id).then((data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  res.end();
})
.put((req, res) => {
  accommodationModel.updateAccommodation(req.params.id, req.body).then((result) => {
    res.json(req.body);
    res.end();
  });
})
.delete((req, res) => {
  accommodationModel.deleteAccommodation(req.params.id).then((result) => {
    res.write(result);
    res.end();
  });
});

accommodationRoute.route('/:id/evaluations')
.get((req, res) => {
  evaluationModel.getEvaluationsByAccommodation(req.params.id).then((data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  evaluationModel.addEvaluation(req.body).then((data) => {
    res.json(data);
    res.end();
  });
})
.put((req, res) => {
  res.end();
})
.delete((req, res) => {
  res.end();
});

accommodationRoute.route('/traveldestinations/:cityname')
.get((req, res) => {
  accommodationModel.getAccommodationsByCity(req.params.cityname).then((data) => {
    res.json(data);
    res.end();
  });
})
module.exports = accommodationRoute;
