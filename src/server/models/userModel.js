const redisClient = require('../redisClient.js');

class Users {
  constructor(redisClient) {

  }
//GET
  getUsers() {
    return redisClient.lrangeAsync('users', 0, -1).then((users) => {
      var filtered = JSON.parse('[' + users + ']').filter((user) => {
        return user.username !== 'deleted' && user.password !== 'deleted';
      });

      return new Promise((resolve) => {
        resolve(filtered);
      });
    });
  }

//GET
  getUserById(id) {
    return this.getUsers().then((users) => {
      var filtered = users.filter((user) => {
        return user._id === parseInt(id, 10);
      });

      return new Promise((resolve) => {
        resolve(filtered);
      });
    });
  }

  getUserByName(username) {
    return this.getUsers().then((users) => {
      var filtered = users.filter((user) => {
        return user.username === username;
      });

      return new Promise((resolve) => {
        resolve(filtered);
      });
    });
  }

//POST
  addUser(user) {
    return redisClient.incrAsync('userIds').then((res) => {
      user._id = parseInt(res, 10);
      return redisClient.rpushAsync(`users`, JSON.stringify(user)).then(() => {
        return new Promise((resolve) => {
          resolve(user);
        });
      });
    });
  }

//PUT
  updateUser(id, user) {
    return redisClient.lsetAsync('users', parseInt(id), JSON.stringify({
      _id: parseInt(id),
      username: user.username,
      password: user.password
    }));
  }

//DELETE
  removeUser(id) {
    return this.updateUser(id, {
      _id: parseInt(id),
      username: 'deleted',
      password: 'deleted'
    });
  }

  isValidLogin(username, password) {
    return this.getUserByName(username).then((user) => {
      
      return new Promise((resolve, reject) => {
        if(user.length > 0 && user[0].password === password) {
          resolve(user);
        } else {
          // User not found or password incorrect
          reject();
        }
      });
    });
  }
}

module.exports = Users;
