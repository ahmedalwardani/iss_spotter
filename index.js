const {nextISSTimesForMyLocation } = require("./iss");
const dateFNS = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");

nextISSTimesForMyLocation((error, results) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    results.forEach(result => {
      const utcDate = zonedTimeToUtc(new Date(), "America/New_York");
      const outputDate = dateFNS.addMilliseconds(utcDate, result.risetime);

      console.log(`Next pass at ${outputDate} for ${result.duration} seconds!`);
    });
  }
});

