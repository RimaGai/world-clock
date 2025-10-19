function updateTime() {
  let parisDate = document.querySelector("#paris .date");
  let parisTime = document.querySelector("#paris .time");
  let parisDiv = document.querySelector("#paris");
  let parisNow = moment().tz("Europe/Paris");
  applyDayNight(parisDiv, parisNow);
  parisDate.innerHTML = parisNow.format("dddd, MMMM D, YYYY");
  parisTime.innerHTML = parisNow.format("HH:mm:ss A");

  let sydneyDate = document.querySelector("#sydney .date");
  let sydneyTime = document.querySelector("#sydney .time");
  let sydneyDiv = document.querySelector("#sydney");
  let sydneyNow = moment().tz("Australia/Sydney");
  applyDayNight(sydneyDiv, sydneyNow);
  sydneyDate.innerHTML = sydneyNow.format("dddd, MMMM D, YYYY");
  sydneyTime.innerHTML = sydneyNow.format("HH:mm:ss A");

  let tokyoDate = document.querySelector("#tokyo .date");
  let tokyoTime = document.querySelector("#tokyo .time");
  let tokyoDiv = document.querySelector("#tokyo");
  let tokyoNow = moment().tz("Asia/Tokyo");
  applyDayNight(tokyoDiv, tokyoNow);
  tokyoDate.innerHTML = tokyoNow.format("dddd, MMMM D, YYYY");
  tokyoTime.innerHTML = tokyoNow.format("HH:mm:ss A");

  let selectedCityDiv = document.querySelector("#selectedCity .city");
  let selectedCityValue = document.querySelector("#city").value;

  if (selectedCityDiv && selectedCityValue) {
    let cityTimeZone = selectedCityDiv.dataset.tz;
    let cityTime = moment().tz(cityTimeZone);
    applyDayNight(selectedCityDiv, cityTime);
    selectedCityDiv.querySelector(".date").innerHTML = cityTime.format("dddd, MMMM Do YYYY");
    selectedCityDiv.querySelector(".time").innerHTML = `${cityTime.format("HH:mm:ss")} <small>${cityTime.format(
      "A"
    )}</small>`;
  }

  function applyDayNight(cityDiv, cityMoment) {
    if (!cityDiv.querySelector("h2")) return;
    let hour = cityMoment.hour();

    cityDiv.classList.remove("sunrise", "day", "sunset", "night");

    if (hour >= 6 && hour < 9) {
      cityDiv.classList.add("sunrise");
    } else if (hour >= 9 && hour < 18) {
      cityDiv.classList.add("day");
    } else if (hour >= 18 && hour < 21) {
      cityDiv.classList.add("sunset");
    } else {
      cityDiv.classList.add("night");
    }
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
