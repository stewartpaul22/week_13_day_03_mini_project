// Initial app.js
const Request = require('./services/requests.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const getRestCountriesComplete = function(allCountries){
  for(let country of allCountries){
    console.log("Country Name: ", country.name);
  }
}


const appStart = function(){
  console.log("DOM content loaded, app starting...");
  requestRestCountries.get(getRestCountriesComplete);
}


document.addEventListener('DOMContentLoaded', appStart);
