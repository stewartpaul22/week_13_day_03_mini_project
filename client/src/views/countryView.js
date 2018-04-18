const CountryView = function(){
  this.countries = [];
}

CountryView.prototype.createCountryDropdown = function (apiCountries) {
  const select = document.getElementById('select-country');
  for (let country of apiCountries) {
    const option = document.createElement('option');
    option.value = country;
    option.innerText = country.name;
    select.appendChild(option);
  }
};

module.exports = CountryView;
