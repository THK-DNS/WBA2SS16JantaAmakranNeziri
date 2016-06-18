const redisClient = require('../redisClient.js');

class Users {
  constructor(redisClient) {

  }
//GET
  getUsers() {
    return redisClient.lrangeAsync('users', 0, -1).then((users) => {
      return new Promise((resolve) => {
        resolve(JSON.parse('[' + users + ']'));
      });
    });
  }

//GET
  getUserById(id) {
    return getUsers().then((users) => {
      var filtered = users.filter((user) => {
        return user.id === parseInt(id, 10);
      });

      return new Promise((resolve) => {
        resolve(filtered);
      });
    });
  }

//POST
  addUser(user) {
    return redisClient.incrAsync('userIds').then((res) => {
      const id = res;
      return redisClient.rpushAsync(`users`, JSON.stringify(user)).then(() => {
        return new Promise((resolve) => {
          resolve({ id: id, username: user.username, password: user.password });
        });
      });
    });
  }

//PUT
  updateUser(id, user) {
    return redisClient.setAsync('users', parseInt(id), JSON.stringify({
      id: parseInt(id),
      username: user.username,
      password: user.password
    }));
  }

//DELETE
  removeUser(id) {
    return this.updateUser(id, {
      id: parseInt(id),
      username: 'deleted',
      password: 'deleted'
    });
  }
}

module.exports = Users;
