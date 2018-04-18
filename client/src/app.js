// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const getRestCountriesComplete = function(allCountries){
  countryView.createCountryDropdown(allCountries);
}

// const addCountryButtonClicked = function() {
//   const  = document.querySelector("#select-country");
//   addCountryButton.addEventListener("change", function(event) {
//
//   })
//   debugger;
// }

const appStart = function(){
  console.log("DOM content loaded, app starting...");
  requestRestCountries.get(getRestCountriesComplete);

  // const addCountryButton = document.querySelector("#add-country");
  // addCountryButton.addEventListener("click", addCountryButtonClicked);

  const dropDown = document.querySelector("#select-country");
  dropDown.addEventListener("change", function(event) {
    console.log(event);
  })
}


document.addEventListener('DOMContentLoaded', appStart);
