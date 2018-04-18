// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const getRestCountriesComplete = function(allCountries){
  countryView.createCountryDropdown(allCountries);
}

const getSelectedCountry = function(allCountries){
  const dropDown = document.querySelector("#select-country");
  debugger;
  dropDown.addEventListener("change", function(event) {
    const selectedCountry = allCountries[(event.target.selectedIndex) -1];
    console.log(selectedCountry);
  })
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
  requestRestCountries.get(getSelectedCountry);

  // const addCountryButton = document.querySelector("#add-country");
  // addCountryButton.addEventListener("click", addCountryButtonClicked);

}


document.addEventListener('DOMContentLoaded', appStart);
