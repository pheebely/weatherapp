function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let temperatureFeelsElement = document.querySelector("#temperature-feels");
  let temperatureFeels = Math.round(response.data.temperature.feels_like);
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#current-country");
  let descElement = document.querySelector("#details-desc");
  let currentDesc = response.data.condition.description;
  let humidElement = document.querySelector("#details-humid");
  let currentHumid = response.data.temperature.humidity;
  let windElement = document.querySelector("#details-wind");
  let currentWind = response.data.wind.speed.toFixed(1);
  let iconElement = document.querySelector("#current-temp-icon");
  let currentIcon = response.data.condition.icon_url;

  let currentDateELement = document.querySelector("#current-date");
  // let currentDate = new Date(response.data.time * 1000);
  //unix timestamp format

  //change background image based on currentDesc of icon
  let descBackgroundElement = document.querySelector(".current-temp");
  let currentIconDesc = response.data.condition.icon;

  if (
    currentIconDesc.includes("clear") &&
    formatDate.hours > 8 &&
    formatDate.hours < 17
  ) {
    descBackgroundElement.style.backgroundImage = "url('/img/clear.jpg')";
  }

  if (
    currentIconDesc.includes("clear") &&
    formatDate.hours < 8 &&
    formatDate.hours > 17
  ) {
    descBackgroundElement.style.backgroundImage =
      "url('/img/clear_night.jpeg')";
  }

  if (currentIconDesc.includes("cloud") || currentIconDesc.includes("mist")) {
    descBackgroundElement.style.backgroundImage = "url('/img/cloudy.jpg')";
  }

  if (currentIconDesc.includes("rain")) {
    descBackgroundElement.style.backgroundImage = "url('/img/rain_cute.jpg')";
  }

  if (currentIconDesc.includes("thunder")) {
    descBackgroundElement.style.backgroundImage =
      "url('/img/thunderstorm.jpg')";
  }

  if (currentIconDesc.includes("snow")) {
    descBackgroundElement.style.backgroundImage = "url('/img/snow.jpeg')";
  }

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  currentDateELement.innerHTML = formatDate(currentDate);
  temperatureElement.innerHTML = temperature;
  temperatureFeelsElement.innerHTML = temperatureFeels;
  descElement.innerHTML = currentDesc;
  humidElement.innerHTML = currentHumid;
  windElement.innerHTML = currentWind;
  iconElement.innerHTML = `<img src="${currentIcon}" alt=${currentDesc} width=70>`;

  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  // the timestamp is in milliseconds;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
  //return index in the days array based on timestamp
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

function displayForecast(response) {
  console.log(response);

  //for each forecast, we need to match the index for daily[] with days[]
  //do this with function formatDay

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    //do not show first element in the index because it is the current weather;
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formayDay(day.time)}</div>
  <div class="weather-forecast-icon">
  <img src="${day.condition.icon_url}" alt=${
          day.condition.description
        } width=70/></div>
  <div class="weather-forecast-temperatures">
  <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}º</strong>
  </div>
  <div class="weather-forecast-temperature">${Math.round(
    day.temperature.minimum
  )}º</div>
  </div>
</div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDate = new Date();

searchCity("Paris");
