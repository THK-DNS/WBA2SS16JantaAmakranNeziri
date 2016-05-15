const pg = require('pg');
pg.defaults.ssl = true;

class Users {
	constructor(url) {
		this.dbUrl = url;
	}

	getUsers(callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query("SELECT array_to_json(array_agg(row_to_json(u))) FROM (SELECT id, username FROM Users) u;", (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	getUserById(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`SELECT array_to_json(array_agg(row_to_json(u))) FROM (SELECT id, username FROM Users WHERE id='${id}') u;`, (err, result) => {
				done();
				if(err) {
					return console.error(err);
				} 

				// Invoke callback with result in json array format
				callback(result.rows[0].array_to_json);
			});
		});
	}

	addUser(user, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`INSERT INTO Users(username, password) VALUES('${user.username}', '${user.password}');`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	updateUser(id, user, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`UPDATE Users SET username='${user.username}', password='${user.password}' WHERE id='${id}';`, (err, result) => {
				done();
				callback(err);
			});
		});
	}

	removeUser(id, callback) {
		pg.connect(this.dbUrl, (err, client, done) => {
			if (err) throw err;

			client.query(`DELETE FROM Users WHERE id='${id}';`, (err, result) => {
				done();
				callback(err);
			});
		});
	}
}

module.exports = Users;