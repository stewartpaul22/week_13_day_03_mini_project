// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');

const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');

const countryView = new CountryView();

const createRequestComplete = function(newBucketListCountry){
  console.log("hello");
  countryView.addCountry(newBucketListCountry);
  console.log("create request complete", newBucketListCountry.name);
}

const getBucketListComplete = function(bucketList) {
  bucketList.forEach(function(country) {
    countryView.render(country);
  });
}

const clearBucketListComplete = function(){
  countryView.clear();
}


const getRestCountriesComplete = function(allCountries){
  let selectedCountry = {};

  // populates drop down
  countryView.createCountryDropdown(allCountries);

  // on change, stores selected country as local variable
  const dropDown = document.querySelector("#select-country");
  dropDown.addEventListener("change", function(event){
    selectedCountry = allCountries[(event.target.selectedIndex) -1];
    console.log(selectedCountry);
  });

  // on click, adds country to stored bucket list in database
  const addCountryButton = document.querySelector("#add-country");
  addCountryButton.addEventListener("click", function(event){
    console.log("Add Country button clicked.. country selected is: ", selectedCountry);
    requestBucketList.post(createRequestComplete, selectedCountry);

  });
};

const appStart = function(){
  console.log("DOM content loaded, app starting...");

  requestRestCountries.get(getRestCountriesComplete);
  requestBucketList.get(getBucketListComplete);

  const deleteBucketListButton = document.querySelector("#delete-countries");
  deleteBucketListButton.addEventListener("click", function(){
    requestBucketList.delete(clearBucketListComplete);
  });
}

document.addEventListener('DOMContentLoaded', appStart);
