const express = require('express');
const Evaluations = require('../models/evaluationModel.js');

const evaluationRoute = new express.Router();
const evaluationModel = new Evaluations(process.env.DATABASE_URL);

evaluationRoute.route('/')
.get((req, res) => {
  evaluationModel.getEvaluations((data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  evaluationModel.addEvaluation(req.body, (err) => {
    if (err) {
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

evaluationRoute.route('/:id')
.get((req, res) => {
  evaluationModel.getEvaluationsById(req.params.id, (data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  res.end();
})
.put((req, res) => {
  evaluationModel.updateEvaluation(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
    }

    res.end();
  });
})
.delete((req, res) => {
  evaluationModel.removeEvaluation(req.params.id, (err) => {
    if (err) {
      console.log(err);
    }

    res.end();
  });
});


module.exports = evaluationRoute;
