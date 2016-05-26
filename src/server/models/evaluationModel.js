const redisClient = require('../redisClient.js');

class Evaluations {
  constructor() {
  }

  getEvaluations() {
    return redisClient.lrangeAsync('evaluations', 0, -1).then((evaluations) => {
      var obj = JSON.parse('[' + evaluations + ']');

      return new Promise((resolve) => {
        resolve(obj);
      })
    });
  }

  getEvaluationsById(id) {
    return this.getEvaluations().then((evaluations) => {
      const filteredEvaluations = evaluations.filter((elem) => {
        return elem.id === parseInt(id, 10);
      })

      return new Promise((resolve) => {
        resolve(filteredEvaluations);
      });
    });
  }

  getEvaluationsByWriter(writerId) {
   return this.getEvaluations().then((evaluations) => {
      const filteredEvaluations = evaluations.filter((elem) => {
        return elem.writer === parseInt(writerId, 10);
      })

      return new Promise((resolve) => {
        resolve(filteredEvaluations);
      });
    });
  }

  getEvaluationsByAccommodation(accommodationId) {
    return this.getEvaluations().then((evaluations) => {
      const filteredEvaluations = evaluations.filter((elem) => {
        return elem.accommodation === parse(accommodationId, 10);
      })

      return new Promise((resolve) => {
        resolve(filteredEvaluations);
      });
    });
  }

  addEvaluation(evaluation) {
    return redisClient.incrAsync('evaluationIds').then((id) => {
      return redisClient.rpushAsync('evaluations', JSON.stringify({
        id: parseInt(id),
        writer: evaluation.writer,
        accommodation: evaluation.accommodation,
        text: evaluation.text,
        rating: evaluation.rating
      }));
    });
  }

  updateEvaluation(id, evaluation) {
    return redisClient.lsetAsync('evaluations', parseInt(id), JSON.stringify({
      id: parseInt(id, 10),
      writer: parseInt(evaluation.writer, 10),
      accommodation: evaluation.accommodation,
      text: evaluation.text,
      rating: evaluation.rating
    }));
  }

  deleteEvaluation(id) {
   return this.updateEvaluation(id, { writer: -1, accommodation: -1, text: 'deleted', rating: 1 })
  }
}

module.exports = Evaluations;
