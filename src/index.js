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
}

let citySelect = document.getElementById("city-select");
let cities = document.querySelectorAll(".city");

citySelect.addEventListener("change", function (event) {
  let selectedCity = event.target.value;

  cities.forEach((city) => {
    if (!selectedCity) {
      city.style.display = "block";
    } else if (city.id === selectedCity) {
      city.style.display = "block";
    } else {
      city.style.display = "none";
    }
  });
});

updateTime();

setInterval(updateTime, 1000);
