
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');

var covertedData = fs.readFileSync(path.join(__dirname, './2018_ContributionData.csv'),
  { encoding : 'utf8'});

var options = {
  delimiter : ',',
  quote     : '"' 
};


const jsonData = JSON.stringify(csvjson.toObject(covertedData, options), null, 2);


fs.writeFile('./govContributionData.json', jsonData, 'utf8', (error) => {
  if (error){
    throw error;
  }
});