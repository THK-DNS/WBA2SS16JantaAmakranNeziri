// TODO: Don't use rpush, instead use set key:id for more flexibility
const Promise = require('bluebird');

class Users {
	constructor(redisClient) {
		this.redisClient = redisClient;
	}

	getUsers() {
		var users = [];
		return this.redisClient.getAsync('userIds').then((res) => {
			return new Promise((resolve) => {
				var idCounter = parseInt(res) + 1;
				var numRejected = 0;
				for(var i = 0;i < idCounter;i++) {
					this.getUserById(i).then((data) => {
						// fulfilled
						if(data != null) {

							// Replace password
							data.password = '******';
							users.push(data);
						} else {
							numRejected++;
						}
						
						if(users.length + numRejected == idCounter) {
							// We reached the end so resolve now callback
							resolve(users);
						}
					});
				}
			});
		});
	}

	getUserById(id) {
		return this.redisClient.getAsync(`users:${id}`).then((res) => {
			var obj = JSON.parse(res);
			
			return new Promise((resolve, reject) => {
				resolve(obj);
			});
		});
	}

	addUser(user) {
		return this.redisClient.incrAsync('userIds').then((res) => {
			user.id = res;
			return this.redisClient.setAsync(`users:${user.id}`, JSON.stringify(user)).then((res) => {
				return new Promise((resolve) => {
					resolve(user);
				});
			});
		});
	}

	updateUser(id, user) {
		user.id = id;
		return this.redisClient.setAsync(`users:${id}`, JSON.stringify(user), 'XX').then((res) => {
			return new Promise((resolve, reject) => {
				if(res == 'OK') {
					resolve();
				} else {
					reject();
				}
			});
		});
	}

	removeUser(id) {
		return this.redisClient.delAsync(`users:${id}`, 'XX').then((res) => {
			return new Promise((resolve, reject) => {
				if(res == '1') {
					resolve();
				} else {
					reject();
				}
			});
			
		});
	}
}

module.exports = Users;