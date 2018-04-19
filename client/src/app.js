// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const getRestCountriesComplete = function(allCountries){
  let selectedCountry = {};

  countryView.createCountryDropdown(allCountries);

  const dropDown = document.querySelector("#select-country");
  dropDown.addEventListener("change", function(event){
    selectedCountry = allCountries[(event.target.selectedIndex) -1];
    console.log(selectedCountry);
  });

  const addCountryButton = document.querySelector("#add-country");
  addCountryButton.addEventListener("click", function(event){
    console.log("Add Country button clicked.. country selected is: ", selectedCountry);
  });
};


const appStart = function(){
  console.log("DOM content loaded, app starting...");
  requestRestCountries.get(getRestCountriesComplete);
}

document.addEventListener('DOMContentLoaded', appStart);
