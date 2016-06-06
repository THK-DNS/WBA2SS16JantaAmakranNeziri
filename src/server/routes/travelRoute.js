const express = require ('express');
const traveldestination = require ('../models/traveldestinationModel.js');

const travelRoute = new express.Router();

const traveldestinationModel = new traveldestination();


traveldestinationRoute.route('/:name')

//GET a traveldestination by its name

.get((req, res) => {

    traveldestinationModel.gettraveldestinationByName(req.params.name).then((traveldestination) => {
      res.json(traveldestination);
      res.end();
    });
  })



module.exports = userRoute;
