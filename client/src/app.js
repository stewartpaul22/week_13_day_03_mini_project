// Initial app.js
const Request = require('./services/requests.js');
const CountryView = require('./views/countryView.js');
const MapWrapper = require("./views/viewMap.js");
let map = {};


const requestBucketList = new Request('http://localhost:3000/api/bucket_list');
const requestRestCountries = new Request('https://restcountries.eu/rest/v2/all');


const countryView = new CountryView();

const createRequestComplete = function(newBucketListCountry){
  console.log("hello");
  countryView.addCountry(newBucketListCountry);
  console.log("create request complete", newBucketListCountry.name);
  const coords = {lat: parseFloat(newBucketListCountry.latlng[0]), lng: parseFloat(newBucketListCountry.latlng[1])};
  map.addMarker(coords, newBucketListCountry.name);

}

const renderMap = function(bucketList){
  console.log("Rendered map...");
  for(let country of bucketList) {
    console.log(country);
    const coords = {lat: parseFloat(country.latlng[0]), lng: parseFloat(country.latlng[1])};
    map.addMarker(coords, country.name);
  }
}

const getBucketListComplete = function(bucketList) {
  bucketList.forEach(function(country) {
    countryView.render(country);
  });
  console.log("About to render map...");
  renderMap(bucketList);
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
  const mapContainer = document.querySelector("#main-map");
  map = new MapWrapper(mapContainer, {lat: 0, lng: 0}, 2);

  console.log("DOM content loaded, app starting...");


  requestRestCountries.get(getRestCountriesComplete);
  requestBucketList.get(getBucketListComplete);



  const deleteBucketListButton = document.querySelector("#delete-countries");
  deleteBucketListButton.addEventListener("click", function(){
    requestBucketList.delete(clearBucketListComplete);
  });
}

document.addEventListener('DOMContentLoaded', appStart);
