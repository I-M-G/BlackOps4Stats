const request = require('request');
const auth = require('./auth');
const Data = require('./scripts/Data');


const options = {
  url: `https://cod-api.tracker.gg/v1/standard/bo4/profile/${auth.platform}/${auth.gamertag}`,
  headers: {
    'TRN-Api-Key': auth.apiKey
  }
}

request(options, getData); // Make initial request

const getData = (error, response, body) => {
  if(error) console.log(`Err: ${error}`);

  // let stats = JSON.parse(body);
  // console.log(stats.data.stats); // Full API stat data

  Data.handleData(body);

}

const getNewData = () => {
  request(options, getData);
  console.log(`New Data: ${new Date().toLocaleTimeString()}`);
}
setInterval(getNewData, 1000 * 10);