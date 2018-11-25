const fs = require('fs');

// Relevant data from the api that we want to use
let stats = [
  {title: 'Prestige', value: 0},
  {title: 'Level', value: 0},
  {title: 'TotalKills', value: 0},
  {title: 'TotalWins', value: 0},
  {title: 'EikaRatio', value: 0},
  {title: 'KDRatio', value: 0}, //Actual kills ratio
  {title: 'WinLoseRatio', value: 0} // I believe, ratio is percent of games won (ex. 78%)
]


let handleData = apiData => {
  let parsed = JSON.parse(apiData);
  // console.log(parsed.data.stats); // Data less metadat. ie platform, user etc

  // Used to get data keys and indexes
  // for(let i = 0; i < parsed.data.stats.length; i++) {
  //   let reference = [];
  //   reference[i] = {key: parsed.data.stats[i].metadata.key, index: i};
  //   console.log(`Array Key: ${parsed.data.stats[i].metadata.key}, Position: ${i}`);
  //   // writeFiles('ReferenceFile', 'JSON', JSON.stringify(reference));
  // }

  let winLose = parsed.data.stats[16].value / parsed.data.stats[17].value;
  stats[0].value = parsed.data.stats[0].displayValue;
  stats[1].value = parsed.data.stats[1].displayValue;
  stats[2].value = parsed.data.stats[3].displayValue;
  stats[3].value = parsed.data.stats[16].displayValue;
  stats[4].value = parsed.data.stats[41].displayValue;
  stats[5].value = parsed.data.stats[2].displayValue;
  stats[6].value = winLose; // Converted (ex. 3.41 wins for ever lose)
  
  // for(let i = 0; i < stats.length; i++) {
  //   writeFiles(stats[i].title, 'txt', stats[i].value);
  // }

  console.log(`Prestige: ${stats[0].value}, Level: ${stats[1].value}`);
}



let writeFiles = (fileName, fileType, data) => {
  fs.writeFile(`./Data/${fileName}.${fileType}`, data, error => {
    if(error) console.log(error);

    console.log('FILE SAVED');
  });
}

module.exports.handleData = handleData;