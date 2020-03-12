const request = require("request");
const ipEndPoint = "https://api.ipify.org?format=json";
const geoEndPoint = "https://ipvigilante.com/";
const nasaEndPoint = "http://api.open-notify.org/iss-pass.json?";

const fetchMyIP = function(callback) {
  request(ipEndPoint, (err, response, body) => {
    if (err) {
      return callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      return callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`${geoEndPoint}${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const longLat = {
        latitude: JSON.parse(body).data.latitude,
        longitude: JSON.parse(body).data.longitude
      };
      return callback(null, longLat);
    }

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  
  request(`${nasaEndPoint}lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const nasaData = JSON.parse(body).response;
      return callback(null, nasaData);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(data, (error, body) => {
        if (error) return callback(error, null);
        return callback(null, body);
      });
    });
  });
};


module.exports = {
  nextISSTimesForMyLocation
};