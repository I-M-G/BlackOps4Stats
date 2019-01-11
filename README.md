# Black Ops 4 Stats
Using [COD Tracker API](https://cod.tracker.gg/site-api) for player stats. Initial intention is to use with a stream overlay and/or chat bot. Data for streaming is output to text files that can be used in [OBS](https://obsproject.com/) or [Xsplit](https://www.xsplit.com/).

The API supports BO4, BO3, IW, and WWII. This project is currently only using BO4, so the endpoints may differ if you want other game data.
API Endpoint: `https://cod-api.tracker.gg/v1/standard/{GAME}/profile/{PLATFORM}/{NAME}`

## Project Setup
1. You'll need to get an API key from [here](https://cod.tracker.gg/site-api).
2. Install init npm and install dependencies. I'm using request and filesystem, but only request needs to be installed `npm i request`.
3. Create an `auth.js` or `.env` file to store your key and other sensitive data. Change or update `auth.apiKey` and `auth.gamertag` in `app.js`. You'll also want to update the platform. `1 = XBOX, 2 = PSN, 3 = BattleNet`.
```javascript
const options = {
  url: `https://cod-api.tracker.gg/v1/standard/bo4/profile/${auth.platform}/${auth.gamertag}`,
  headers: {
    'TRN-Api-Key': auth.apiKey
  }
}
```
4. Update the path for saving the text files in `Data.js`. You can save anywhere you'd like.
```javascript
let writeFiles = (fileName, fileType, data) => {
  fs.writeFile(`./Data/${fileName}.${fileType}`, data, error => {
    if(error) console.log(error);

    console.log('FILE SAVED');
  });
}
```
5. Uncomment the for loop in `Data.js` inside the `handleData` function. The `writeFiles` function saves data to a Data folder in the project, so you'll need to change or update that.
```javascript
// for(let i = 0; i < stats.length; i++) {
//   writeFiles(stats[i].title, 'txt', stats[i].value);
// }
```

## Steam Setup
Just going to show how to bring in text files to the most common streaming software. For now that will be OBS and Xsplit.

### [OBS](https://obsproject.com/)
These steps were last tested with OBS version 22.0.2

1. Open OBS and go to the scene that will use the data.
2. Click the plus sign to add a new source. Then select the "Text (GDI+)" option.
3. A sub menu will open. You can name your new source here if you wish. Click "OK" when you are finished.
4. The next menu will let you configure the text's display on the stream. Here we will add the file we wish to display. Select the check box "Read from file" and then select "Browse". Navigate to the location of the saved files. You'll need to run the app once or you will not have your files yet.
5. You can customize the font, color, background and a few other options, but at this point you are done with adding the files. Click "OK" and then position and resize as you need within your scene.

### [Xsplit](https://www.xsplit.com/)
These steps were last tested with Xsplit version 3.6 and a premium license.

1. Open Xsplit and go to the scene that will use the data.
2. Select "Add source" and then click "Text...".
3. A sub menu will open, click the check box "Use custom script" and then select "Edit Script".
4. From the "Template" drop down select "Load Text from Local File".
5. In the settings tab go to the "File Path" option and navigate to the location of the saved files. You'll need to run the app once or you will not have your files yet.
6. In this menu you can also add an update interval. This will check the file for changes every X amount of seconds. Probably best to keep this low, so your stream is getting the new data when it's pushed to the file. Not sure about any performance issues a smaller number could have.
7. Finally, click "Update Text" and you are essentially done. You can customize the font, color, background and a few other options at this point. Click "OK" and then position and resize as you need within your scene.
