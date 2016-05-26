const redisClient = require('../redisClient.js');

class Users {
  constructor(redisClient) {
    
  }

  getUsers() {
    const users = [];
    return redisClient.getAsync('userIds').then((res) => {
      return new Promise((resolve) => {
        const count = parseInt(res, 10) + 1;
        let numRejected = 0;

        for (let i = 0; i < count; i++) {
          this.getUserById(i).then((data) => {
            // fulfilled
            if (data !== null) {
              // Replace password
              users.push(data);
            } else {
              numRejected++;
            }

            if (users.length + numRejected === count) {
              // We reached the end so resolve now callback
              resolve(users);
            }
          });
        }
      });
    });
  }

  getUserById(id) {
    return redisClient.getAsync(`users:${id}`).then((res) => {
      const obj = JSON.parse(res);

      return new Promise((resolve) => {
        if(obj != null) {
          resolve({ id: id, username: obj.username, password: '******' });
        } else {
          resolve(null);
        }
        
      });
    });
  }

  addUser(user) {
    return redisClient.incrAsync('userIds').then((res) => {
      const id = res;
      return redisClient.setAsync(`users:${id}`, JSON.stringify(user)).then(() => {
        return new Promise((resolve) => {
          resolve({ id: id, username: user.username, password: user.password });
        });
      });
    });
  }

  updateUser(id, user) {
    user.id = id;
    return redisClient.setAsync(`users:${id}`, JSON.stringify(user), 'XX').then((res) => {
      return new Promise((resolve, reject) => {
        if (res === 'OK') {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  removeUser(id) {
    return redisClient.delAsync(`users:${id}`, 'XX').then((res) => {
      return new Promise((resolve, reject) => {
        if (res === '1') {
          resolve();
        } else {
          reject();
        }
      });

    });
  }
}

module.exports = Users;
