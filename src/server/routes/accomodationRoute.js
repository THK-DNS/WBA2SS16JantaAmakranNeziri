const express = require('express');
const Accomodations = require('../models/accomodationModel.js');

const accomodationRoute = new express.Router();
const accomodationModel = new Accomodations(process.env.DATABASE_URL);

accomodationRoute.route('/')
  .get((req, res) => {
    accomodationModel.getAccomodations((data) => {
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
    res.end();
  })
  .delete((req, res) => {
    accomodationModel.removeAccomodation(req.params.id, (err) => {
      console.log(err);
      res.end();
    });
});

module.exports = accomodationRoute;
