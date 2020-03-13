const {nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, results) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    results.forEach(result => {
      const date = new Date(result.risetime * 1000);
      console.log(`Next pass at ${date} for ${result.duration} seconds!`);
    });
  }
});

