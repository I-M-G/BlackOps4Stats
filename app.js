const request = require('request');
const credentials = require('./credentials');
const Data = require('./scripts/Data');


const options = {
  url: `https://cod-api.tracker.gg/v1/standard/bo4/profile/2/${credentials.gamertag}`,
  headers: {
    'TRN-Api-Key': credentials.apiKey
  }
}

request(options, getData); // Make initial request

function getData(error, response, body) {
  if(error) console.log(`Err: ${error}`);

  // let stats = JSON.parse(body);
  // console.log(stats.data.stats); // Full API stat data

  Data.handleData(body);

}

setInterval(request(options, getData), 1000 * 10);