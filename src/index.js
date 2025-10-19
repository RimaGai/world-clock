function updateTime() {
  let parisDate = document.querySelector("#paris .date");
  let parisTime = document.querySelector("#paris .time");
  let parisNow = moment().tz("Europe/Paris");
  parisDate.innerHTML = parisNow.format("dddd, MMMM D, YYYY");
  parisTime.innerHTML = parisNow.format("HH:mm:ss A");

  let sydneyDate = document.querySelector("#sydney .date");
  let sydneyTime = document.querySelector("#sydney .time");
  let sydneyNow = moment().tz("Australia/Sydney");
  sydneyDate.innerHTML = sydneyNow.format("dddd, MMMM D, YYYY");
  sydneyTime.innerHTML = sydneyNow.format("HH:mm:ss A");

  let tokyoDate = document.querySelector("#tokyo .date");
  let tokyoTime = document.querySelector("#tokyo .time");
  let tokyoNow = moment().tz("Asia/Tokyo");
  tokyoDate.innerHTML = tokyoNow.format("dddd, MMMM D, YYYY");
  tokyoTime.innerHTML = tokyoNow.format("HH:mm:ss A");

  let selectedCityDiv = document.querySelector("#selectedCity .city");
  if (selectedCityDiv && selectedCityDiv.dataset.tz) {
    let cityTimeZone = selectedCityDiv.dataset.tz;
    let cityTime = moment().tz(cityTimeZone);
    selectedCityDiv.querySelector(".date").innerHTML = cityTime.format("dddd, MMMM Do YYYY");
    selectedCityDiv.querySelector(".time").innerHTML = `${cityTime.format("HH:mm:ss")} <small>${cityTime.format(
      "A"
    )}</small>`;
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;

  let selectedCityElement = document.querySelector("#selectedCity");
  let citiesList = document.querySelector("#cities");

  // If no city is selected, show all cities
  if (!cityTimeZone) {
    citiesList.style.display = "block";
    selectedCityElement.style.display = "none";
    return;
  }

  // If "current" is selected, guess the user's timezone
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityTime = moment().tz(cityTimeZone);
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];

  document.querySelector("#cities").style.display = "none";
  selectedCityElement.style.display = "block";

  selectedCityElement.innerHTML = `
  <div class="city" data-tz="${cityTimeZone}">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("HH:mm:ss")} <small>${cityTime.format("A")}</small></div>
  </div>
`;
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

updateTime();
setInterval(updateTime, 1000);
