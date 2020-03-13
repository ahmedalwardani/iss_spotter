const ipEndPoint = "https://api.ipify.org?format=json";
const geoEndPoint = "https://ipvigilante.com/";
const nasaEndPoint = "http://api.open-notify.org/iss-pass.json?";
const request = require("request-promise-native");

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(body => fetchCoordsByIP(JSON.parse(body).ip))
    .then(body => {
      const latLong = {
        latitude: JSON.parse(body).data.latitude,
        longitude: JSON.parse(body).data.longitude
      };
      return fetchISSFlyOverTimes(latLong);
    })
    .then(array => {
      const results = JSON.parse(array).response;
      results.forEach(result => {
        const date = new Date(result.risetime * 1000);
        console.log(`Next pass at ${date} for ${result.duration} seconds!`);
      });
    });
};

const fetchMyIP = () => request(ipEndPoint);

const fetchCoordsByIP = ip => request(`${geoEndPoint}${ip}`);

const fetchISSFlyOverTimes = coords => request(`${nasaEndPoint}lat=${coords.latitude}&lon=${coords.longitude}`);

module.exports = {nextISSTimesForMyLocation};

