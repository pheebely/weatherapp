function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descElement = document.querySelector("#details-desc");
  let currentDesc = response.data.condition.description;
  let humidElement = document.querySelector("#details-humid");
  let currentHumid = response.data.temperature.humidity;
  let windElement = document.querySelector("#details-wind");
  let currentWind = response.data.wind.speed.toFixed(1);
  let iconElement = document.querySelector("#current-temp-icon");
  let currentIcon = response.data.condition.icon_url;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descElement.innerHTML = currentDesc;
  humidElement.innerHTML = currentHumid;
  windElement.innerHTML = currentWind;
  iconElement.innerHTML = `<img src="${currentIcon}" alt=${currentDesc} width=70>`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
