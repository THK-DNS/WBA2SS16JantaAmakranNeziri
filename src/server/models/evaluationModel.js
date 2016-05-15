const pg = require('pg');
pg.defaults.ssl = true;

class Evaluations {
	constructor(url) {
		this.dbUrl = url;
	}

	getEvaluations(callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query("SELECT array_to_json(array_agg(Evaluations)) FROM Evaluations;", (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getEvaluationById(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(Evaluations)) FROM Evaluations WHERE id='${id}';`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getEvaluationByWriter(writerId, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(Evaluations)) FROM Evaluations WHERE writer='${writerId}';`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getEvaluationByAccomodation(accomodationId, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(Evaluations)) FROM Evaluations WHERE accomodation='${accomodationId}';`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	addEvaluation(evaluation, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`INSERT INTO Evaluations(writer, accomodation, text, rating) VALUES('${evaluation.writer}', '${evaluation.accomodation}', '${evaluation.text}', '${evaluation.rating}');`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	updateEvaluation(id, evaluation, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`UPDATE Evaluations SET writer='${evaluation.writer}', accomodation='${evaluation.accomodation}', text='${evaluation.text}', rating='${evaluation.rating}' WHERE id='${id}';`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	removeEvaluation(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`DELETE FROM Evaluations WHERE id='${id}';`, (err, result) => {
				done();
				callback(err);
			});
		});
	}
}

module.exports = Evaluations;