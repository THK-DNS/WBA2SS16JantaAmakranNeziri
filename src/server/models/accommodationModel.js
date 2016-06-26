const redisClient = require('../redisClient.js');

class Accommodations {
  constructor() {
  }

  getAccommodations() {
    return redisClient.lrangeAsync('accommodations', 0, -1).then((accommodations) => {
      var jsonAccommodations = JSON.parse('[' + accommodations + ']');

      // Dont show deleted
      var filtered = jsonAccommodations.filter((accommodation) => {
        return accommodation.owner !== -1;
      });

      return new Promise((resolve) => {
        resolve(filtered);
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

  getAccommodationsByCity(city) {
    return this.getAccommodations().then((accommodations) => {
      var filtered = accommodations.filter((accommodation) => {
        return accommodation.city.toLowerCase() === city.toLowerCase();
      });

      return new Promise((resolve) => {
        resolve(filtered);
      });
    });
  }

  deleteAccommodation(id) {
    return this.updateAccommodation(id, { owner: -1, title: 'deleted', description: 'deleted', picture: 'deleted.png', city: 'deleted' });
  }

  addAccommodation(accommodation) {
    
    return redisClient.incrAsync('accommodationIds').then((res) => {
      var accoObj = {
        id: parseInt(res, 10),
        owner: parseInt(accommodation.owner, 10),
        title: accommodation.title,
        description: accommodation.description,
        picture: accommodation.picture,
        city: accommodation.city
      };

      return redisClient.rpushAsync('accommodations', JSON.stringify(accoObj)).then(() => {
        return new Promise((resolve) => {
          resolve(accoObj);
        });
      });
    });
  }

  updateAccommodation(id, accommodation) {
    return redisClient.lsetAsync('accommodations', parseInt(id), JSON.stringify({
      id: parseInt(id, 10),
      owner: parseInt(accommodation.owner, 10),
      title: accommodation.title,
      description: accommodation.description,
      picture: accommodation.picture,
      city: accommodation.city
    }));
  }
}

module.exports = Accommodations;
