const CountryView = function(){
  this.countries = [];
}

CountryView.prototype.createCountryDropdown = function (apiCountries) {
  const select = document.getElementById('select-country');
  for (let country of apiCountries) {
    const option = document.createElement('option');
    option.value = country.name;
    option.innerText = country.name;
    select.appendChild(option);
  }
};

CountryView.prototype.addCountry = function (country) {
  this.countries.push(country);
  this.render(country);
};

CountryView.prototype.render = function (country) {
  const ul = document.querySelector("#bucket-countries");
  const li = document.createElement("li");
  const text = document.createElement("p");
  text.innerText = country.name;
  li.appendChild(text);
  ul.appendChild(li);
};


module.exports = CountryView;
