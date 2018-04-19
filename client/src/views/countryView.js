const CountryView = function(){
  this.countries = [];
}

CountryView.prototype.createCountryDropdown = function (apiCountries) {
  const select = document.getElementById('select-country');
  for (let country of apiCountries) {
    const option = document.createElement('option');
    // added .name
    option.value = country.name;
    option.innerText = country.name;
    select.appendChild(option);
  }
  // apiCountries.forEach(function(country, index){
  //   let option = document.createElement('option');
  //   option.innerText = country.name;
  //   option.value = index;
  //   select.appendChild(option);
  // })
};

module.exports = CountryView;
