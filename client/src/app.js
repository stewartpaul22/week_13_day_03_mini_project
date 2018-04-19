// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const getRestCountriesComplete = function(allCountries){
  countryView.createCountryDropdown(allCountries);
}

// todo:  createRequestComplete

const addCountryButtonClicked = function() {
  const selectedCountry = document.querySelector("#select-country").value;

  const countryToSend = { name: selectedCountry };

  // requestBucketList.post(createRequestComplete, countryToSend);
}

const appStart = function(){
  console.log("DOM content loaded, app starting...");

  requestRestCountries.get(getRestCountriesComplete);

  const addCountryButton = document.querySelector("#add-country");
  addCountryButton.addEventListener("click", addCountryButtonClicked);

}

document.addEventListener('DOMContentLoaded', appStart);
