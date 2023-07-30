//language setting

const languageSelector = document.getElementById("language-selector");
let currentLanguage = "EN";

function changeLanguage() {
  if (currentLanguage === "EN") {
    currentLanguage = "FA";
    languageSelector.innerHTML = "فا";
    searchBox.placeholder = "نام شهر را وارد کنید";
    document.getElementById("feels-like-text").innerHTML = "احساس میشود";
    document.getElementById("humidity-text").innerHTML = "رطوبت";
    document.getElementById("pressure-text").innerHTML = "فشار";
    document.getElementById("wind-speed-text").innerHTML = "سرعت باد";
    document.getElementById("search-text").innerHTML =
      "نام شهر موردنظر را به انگلیسی یا فارسی وارد کنید سپس اینتر را فشار دهید";

    if (searchBox.value !== "") {
      process(searchBox.value, currentLanguage);
    }
  } else {
    currentLanguage = "EN";
    languageSelector.innerHTML = "EN";
    searchBox.placeholder = "enter city";
    document.getElementById("feels-like-text").innerHTML = "feels like";
    document.getElementById("humidity-text").innerHTML = "humidity";
    document.getElementById("pressure-text").innerHTML = "pressure";
    document.getElementById("wind-speed-text").innerHTML = "wind speed";
    document.getElementById("search-text").innerHTML =
      "write the name of the city in English or Persian. Then press enter.";

    if (searchBox.value !== "") {
      process(searchBox.value, currentLanguage);
    }
  }
}

//input setting

const searchBox = document.getElementById("search-box");
const container = document.getElementsByClassName("container");
const descriptionContainer = document.getElementsByClassName(
  "description-container"
);
const minDegreeBox = document.getElementsByClassName("min-degree-box");
const maxDegreeBox = document.getElementsByClassName("max-degree-box");
const mainDataContainer = document.getElementsByClassName(
  "main-data-container"
);
const startContainer = document.getElementsByClassName("start-container");
const searchText = document.getElementById("search-text");
const searchIcon = document.getElementById("search-icon");

let counter = 0;

//initilize the process
//if it's the first time, do the transition as well
searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    counter++;
    process(searchBox.value, currentLanguage);

    //if it's the first time:
    if (counter === 1) {
      container[0].classList.remove("hidden");
      descriptionContainer[0].classList.remove("hidden");
      weatherIcon[0].classList.remove("hidden");
      mainDataContainer[0].classList.remove("hidden");
      searchIcon.remove();
      searchText.classList.add("hidden");
      searchBox.classList.add("after");
    }
  }
});

//change search box's position after the first try
searchBox.addEventListener("click", () => {
  if (!searchBox.classList.contains("clicked")) {
    searchBox.classList.add("clicked");
  }
});

//variable placement

cityName = document.getElementById("city-name");
description = document.getElementById("description");
degree = document.getElementById("degree");
maxDegree = document.getElementById("max-degree");
minDegree = document.getElementById("min-degree");
feelsLike = document.getElementById("feels-like");
humidity = document.getElementById("humidity");
pressure = document.getElementById("pressure");
windSpeed = document.getElementById("wind-speed");

//API setting

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const appId = "bcd4b7c249caf49060b0d1334e436a8c";

//get API, process it and show data
async function process(city, language) {
  const response = await fetch(
    apiUrl + city + `&lang=${language}` + `&appid=${appId}`
  );

  let data = await response.json();

  if (!data.name) {
    cityName.innerHTML = "undefined";
    description.innerHTML = "no information available.";
    degree.innerHTML = "? ";
    minDegree.innerHTML = "N/A";
    maxDegree.innerHTML = "N/A";
    feelsLike.innerHTML = "N/A";
    humidity.innerHTML = "N/A";
    pressure.innerHTML = "N/A";
    windSpeed.innerHTML = "N/A";
    weatherImage.src = "assets/undefined.png";
  } else {
    cityName.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    degree.innerHTML = Math.round(data.main.temp) + "°";
    minDegree.innerHTML = data.main.temp_min + "°";
    maxDegree.innerHTML = data.main.temp_max + "°";
    feelsLike.innerHTML = data.main.feels_like + "°";
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + " hPa";
    windSpeed.innerHTML = data.wind.speed + " m/s";
    chooseIcon(data.weather[0].id);
  }
}

//image setting

const weatherIcon = document.getElementsByClassName("weather-icon");
const weatherImage = document.getElementById("weather-image");

function chooseIcon(id) {
  if (200 <= id && id <= 232) {
    weatherImage.src = "assets/thunder.png";
  } else if (500 <= id && id <= 504) {
    weatherImage.src = "assets/rain.png";
  } else if ((600 <= id && id <= 622) || id === 511) {
    weatherImage.src = "assets/snow.png";
  } else if (701 <= id && id <= 781) {
    weatherImage.src = "assets/mist.png";
  } else if (id === 801 || id === 802) {
    weatherImage.src = "assets/halfcloud.png";
  } else if (id === 804 || id === 803) {
    weatherImage.src = "assets/cloud.png";
  } else if (id === 800) {
    weatherImage.src = "assets/sunny.png";
  } else {
    weatherImage.src = "assets/shower.png";
  }
}
