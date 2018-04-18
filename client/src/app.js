// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const getRestCountriesComplete = function(allCountries){
  countryView.createCountryDropdown(allCountries);
}


const appStart = function(){
  console.log("DOM content loaded, app starting...");
  requestRestCountries.get(getRestCountriesComplete);
}


document.addEventListener('DOMContentLoaded', appStart);
