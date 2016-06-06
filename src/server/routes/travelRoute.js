const express = require ('express');
const traveldestination = require ('../models/traveldestinationModel.js');

const travelRoute = new express.Router();

const traveldestinationModel = new traveldestination();


travelRoute.route('/')

//GET all traveldestination
.get((req, res) => {
      traveldestinationModel.gettraveldestination().then((traveldestination) => {
        res.json(traveldestination);
        res.end();
    });
  })

//POST  a new traveldestination
.post((req, res) => {
  traveldestinationModel.addTraveldestination(req.body).then((user) => {
    res.json(user);
    res.end();
  });
})

//PUT update a traveldestination
.put((req, res) => {
  res.end();
})


//DELETE delete a traveldestination
.delete((req, res) => {
  res.end();
});

traveldestinationRoute.route('/:name')

//GET a traveldestination by its name

.get((req, res) => {
    
    traveldestinationModel.gettraveldestinationByName(req.params.name).then((traveldestination) => {
      res.json(traveldestination);
      res.end();
    });
  })



module.exports = userRoute;
