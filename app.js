const request = require('request');
const credentials = require('./credentials');

const options = {
  url: 'https://cod-api.tracker.gg/v1/standard/bo4/profile/2/FIanker_',
  headers: {
    'TRN-Api-Key': credentials.apiKey
  }
}

function getData(error, response, body) {
  if(error) console.log(`Err: ${error}`);
  // console.log(`Status Code: ${response.statusCode}`);

  let stats = JSON.parse(body);
  
  // console.log(stats.data.stats); // Full API data

  for(let i = 0; i < stats.data.stats.length; i++) {
    if(stats.data.stats[i].metadata.key === 'EkiaDeathRatio') {
      console.log(stats.data.stats[i]);
      console.log(`i = ${i}`);
    }
  }

}

request(options, getData);