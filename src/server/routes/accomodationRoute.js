const express = require('express');
const Accomodations = require('../models/accomodationModel.js');

const accomodationRoute = new express.Router();
const accomodationModel = new Accomodations(process.env.DATABASE_URL);

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
      if(err) {
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
    console.log(req.body);
    res.end();
  })
  .delete((req, res) => {
    accomodationModel.removeAccomodation(req.params.id, (err) => {
      if(err) {
        console.log(err);
      }

      res.end();
    });
});

module.exports = accomodationRoute;
