const redisClient = require('../redisClient.js');

class Accommodations {
  constructor() {
  }

  getAccommodations() {
    return redisClient.lrangeAsync('accommodations', 0, -1).then((accommodations) => {
      return new Promise((resolve) => {
        resolve(JSON.parse('[' + accommodations + ']'));
      });
    });
  }

  getAccommodationsById(id) {
    return this.getAccommodations().then((accommodations) => {
      var accommodationsById = accommodations.filter((elem) => {
        return elem.id === parseInt(id, 10);
      });

      return new Promise((resolve) => {
        resolve(accommodationsById);
      })
    });
  }

  getAccommodationsByOwner(ownerId) {
    return this.getAccommodations().then((accommodations) => {
      var accommodationsByOwner = accommodations.filter((elem) => {
        return elem.owner === parseInt(ownerId, 10);
      });

      return new Promise((resolve) => {
        resolve(accommodationsByOwner);
      })
    });
  }

  deleteAccommodation(id) {
    return this.updateAccommodation(id, { owner: -1, title: 'deleted', description: 'deleted', picture: 'deleted.png' });
  }

  addAccommodation(accommodation) {
    return redisClient.incrAsync('accommodationIds').then((res) => {
      return redisClient.rpushAsync('accommodations', JSON.stringify({
        id: parseInt(res, 10), 
        owner: parseInt(accommodation.owner, 10), 
        title: accommodation.title, 
        description: accommodation.description, 
        picture: accommodation.picture 
      }));
    }); 
  }

  updateAccommodation(id, accommodation) {
    return redisClient.lsetAsync('accommodations', parseInt(id), JSON.stringify({
      id: parseInt(id, 10),
      owner: parseInt(accommodation.owner, 10),
      title: accommodation.title,
      description: accommodation.description,
      picture: accommodation.picture
    }));
  }
}

module.exports = Accommodations;
