const express = require ('express');
const Accommodations = require('../models/accommodationModel.js');

const accommodationModel = new Accommodations();

const travelRoute = new express.Router();

travelRoute.route('/:cityname')
//GET a traveldestination by its name
.get((req, res) => {
    accommodationModel.getAccommodationsByCity(req.params.cityname).then((accommodations) => {
      res.json(accommodations);
      res.end();
    });
  })



module.exports = travelRoute;
