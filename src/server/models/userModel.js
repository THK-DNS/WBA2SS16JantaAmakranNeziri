
class Users {
	constructor(redisClient) {
		this.redisClient = redisClient;
	}

	getUsers(callback) {

	}

	getUserById(id, callback) {
		
	}

	addUser(user, callback) {
		this.redisClient.rpush('users', [JSON.stringify(user)], (err, res) => {
			callback(user);
		});
	}

	updateUser(id, user, callback) {
		
	}

	removeUser(id, callback) {
		
	}
}

module.exports = Users;