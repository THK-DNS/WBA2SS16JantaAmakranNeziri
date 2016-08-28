const express = require('express');
const Evaluations = require('../models/evaluationModel.js');

const evaluationRoute = new express.Router();

const evaluationModel = new Evaluations();

evaluationRoute.route('/')
.get((req, res) => {
  evaluationModel.getEvaluations().then((data) => {
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

evaluationRoute.route('/:id')
.get((req, res) => {
  evaluationModel.getEvaluationsById(req.params.id).then((data) => {
    res.json(data);
    res.end();
  });
})
.post((req, res) => {
  res.end();
})
.put((req, res) => {
  evaluationModel.updateEvaluation(req.params.id, req.body).then((data) => {
    res.write(data);
    res.end();
  });
})
.delete((req, res) => {
  evaluationModel.deleteEvaluation(req.params.id).then((data) => {
    res.write(data);
    res.end();
  });
});


module.exports = evaluationRoute;
