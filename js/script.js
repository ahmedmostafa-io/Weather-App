"use strict";
// * arrowfunction to set the variables
const $ = (selector) => document.querySelector(selector);
// ^ variables
const all = $(".all");
const footerOfPage = $(".footerOfPage");
const contact = $(".contact");
const main = $(".main");
const hero = $(".hero");
const navError = document.querySelectorAll(".navError");
const navbar = $(".navbar");
const navHome = $(".navHome");
const navContact = $(".navContact");
const search = $(".search");
const firstWeather = $(".firstWeather");
const btnCtrl = $(".btnCtrl");
let anotherDay = $(".anotherDay");
let nextDayAgain = $(".nextDayAgain");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const contentInfo = document.querySelectorAll(".contentInfo");
// ! functions to make code readable + DRY
const error = function () {
  all.classList.remove("d-none");
  contact.classList.add("d-none");
  footerOfPage.classList.add("d-none");
  main.classList.add("d-none");
  hero.classList.add("d-none");
  navbar.classList.add("d-none");
};
const errorEnd = function () {
  all.classList.add("d-none");
  contact.classList.add("d-none");
  footerOfPage.classList.remove("d-none");
  main.classList.remove("d-none");
  hero.classList.remove("d-none");
  navbar.classList.remove("d-none");
};
const showContact = function () {
  contact.classList.remove("d-none");
  main.classList.add("d-none");
  hero.classList.add("d-none");
  navContact.classList.add("active");
  navHome.classList.remove("active");
};
const showHome = function () {
  contact.classList.add("d-none");
  main.classList.remove("d-none");
  hero.classList.remove("d-none");
  navContact.classList.remove("active");
  navHome.classList.add("active");
};
// * nav alive functions
navContact.addEventListener("click", showContact);
// & main functions
for (let i = 0; i < navError.length; i++) {
  navError[i].addEventListener("click", error);
  document.addEventListener("keydown", function (event) {
    if (window.location.pathname.includes("index.html")) {
      if (event.key === "ArrowRight") {
        errorEnd();
        navContact.classList.remove("active");
        navHome.classList.add("active");
      } else if (event.key === "Escape") {
        errorEnd();
        navContact.classList.remove("active");
        navHome.classList.add("active");
      }
    }
  });
}
navHome.addEventListener("click", showHome);

// & app functions
async function map(data) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b1f6e0b300894234b88144807252504&q=${data}&days=3`
  );
  if (response.ok && 400 != response.status) {
    let data = await response.json();
    displayWeather(data.location, data.current);
    displayNext(data.forecast.forecastday);
    displayLast(data.forecast.forecastday);
  }
}

search.addEventListener("input", function () {
  map(search.value);
});
btnCtrl.addEventListener("click", function () {
  map(search.value);
  search.value = "";
});
function displayWeather(d, m) {
  let e = new Date(m.last_updated.replace(" ", "T"));
  let current = `  <div
                class="head w-100 d-flex justify-content-between align-items-center"
              >
  <div class="day ps-3">${days[e.getDay()]}</div>
                <div class="date pe-3">${
                  e.getDate() + " " + monthNames[e.getMonth()]
                }</div>
              </div>
              <div class="body p-3 pt-4">
                <div class="city">${d.name}</div>
                <div class="degree">
                  <div class="num">${m.temp_c}<sup>o</sup>C</div>
                  <div class="degreeIcon">
                    <img src="https:${m.condition.icon}" alt="" />
                  </div>
                  <div class="weathePara firstWeathePara">${
                    m.condition.text
                  }</div>
                </div>
                <div class="icons pb-3">
                  <span>
                    <img src="./Images/icon-umberella.png" alt="" /> ${
                      m.humidity
                    }%</span
                  >
                  <span
                    ><img src="./Images/icon-wind.png" alt="" /> ${
                      m.wind_kph
                    } km/h</span
                  >
                  <span
                    ><img src="./Images/icon-compass.png" alt="" /> ${
                      m.wind_dir
                    }</span
                  >
                </div>`;
  firstWeather.innerHTML = current;
}
function displayNext(a) {
  let next = "";
  for (let i = 1; i < a.length - 1; i++) {
    next += ` <div class="head2 w-100">${
      days[new Date(a[i].date.replace(" ", "T")).getDay()]
    }</div>
              <div
                class="body2 d-flex flex-column justify-content-center align-items-center pt-4"
              >
                <div><img src="https:${
                  a[i].day.condition.icon
                }" alt="" class="mb-4" /></div>
                <div class="deg">${a[i].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="degNight fs-6">${
                  a[i].day.mintemp_c
                }<sup>o</sup></div>
                <div class="weathePara pb-2">${a[i].day.condition.text}</div>
              </div>`;
  }
  anotherDay.innerHTML = next;
}
function displayLast(a) {
  let next = "";
  for (let i = 2; i <= a.length - 1; i++) {
    next += ` <div class="head w-100">${
      days[new Date(a[i].date.replace(" ", "T")).getDay()]
    }</div>
              <div
                class="body3 d-flex flex-column justify-content-center align-items-center pt-4"
              >
                <div><img src="https:${
                  a[i].day.condition.icon
                }" alt="" class="mb-4" /></div>
                <div class="deg">${a[i].day.maxtemp_c}<sup>o</sup>C</div>
                <div class="degNight fs-6">${
                  a[i].day.mintemp_c
                }<sup>o</sup></div>
                <div class="weathePara pb-2">${a[i].day.condition.text}</div>
              </div>`;
  }
  nextDayAgain.innerHTML = next;
}
map("cairo");
// document.addEventListener("keydown", function (e) {
//   console.log(e.key);
// });
