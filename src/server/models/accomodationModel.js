const pg = require('pg');
pg.defaults.ssl = true;

class Accomodations {
	constructor(url) {
		this.dbUrl = url;
	}

	getAccomodations(callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query("SELECT array_to_json(array_agg(Accomodations)) FROM Accomodations;", (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getAccomodationsById(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(Accomodations)) FROM Accomodations WHERE id='${id}';`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getAccomodationsByOwner(ownerId, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(Accomodations)) FROM Accomodations WHERE owner='${ownerId}';`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	removeAccomodation(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`DELETE FROM Accomodations WHERE id='${id}';`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	addAccomodation(accomodation, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`INSERT INTO Accomodations(owner, title, description, picture) VALUES('${accomodation.owner}', '${accomodation.title}', '${accomodation.description}', '${accomodation.picture}');`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	updateAccomodation(data, callback) {

	}

}

module.exports = Accomodations;