let user_weather = document.querySelector(".user_weather");
let search_weather = document.querySelector(".search_weather");
let grant_access = document.querySelector(".grant_access");

user_weather.classList.add("background");
grant_access.classList.add("active");

user_weather.addEventListener("click", function () {
  weather_data.classList.remove("active")
  user_weather.classList.add("background");
  search_weather.classList.remove("background");
  search_form.classList.remove("active");
  grant_access.classList.add("active");
});

let grant = document.querySelector(".grant");

grant.addEventListener("click",function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
     lat =  position.coords.latitude ;
     lon =   position.coords.longitude;
      }
      console.log(lat)
      console.log(lon)
      async function lonlat() {
        
        let raw = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
        );
        let data = await raw.json();
        renderWeather(data);
        weather_data.classList.add("active");
    
  } lonlat()
   grant_access.classList.remove("active")
})

let search_form = document.querySelector(".search_form");

search_weather.addEventListener("click", function () {
  weather_data.classList.remove("active")
  search_weather.classList.add("background");
  user_weather.classList.remove("background");
  search_form.classList.add("active");
  grant_access.classList.remove("active");
});

let API_key = `fceb3e02d7a6514dd22d347a9f21341e`;

function renderWeather(data) {
  let temp = document.querySelector(".temp");
  let search_city = document.querySelector("[search_city]");
  let flag = document.querySelector("[flag]");
  let discription = document.querySelector("[discription]");
  let discription_img = document.querySelector("[discription_img]");
  let speed = document.querySelector("[speed]");
  let humid = document.querySelector("[humid]");
  let cloud = document.querySelector("[cloud]");
  search_city.innerHTML = data?.name;
  flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
  discription.innerHTML = data?.weather?.[0]?.description;
  discription_img.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
  temp.innerHTML = `${data?.main?.temp - 273.15} °C`;
  speed.innerHTML = data?.wind?.speed + " " + "m/s";
  humid.innerHTML = data?.main?.humidity + " " + "%";
  cloud.innerHTML = data?.clouds?.all + " " + "%";
}

let search_btn = document.querySelector(".search_btn");
let weather_data = document.querySelector(".weather_data");

search_btn.addEventListener("click", function () {
  console.log("I am inside secarch btn function");

  try {
    getbycity();
    async function getbycity() {
      let city_name = document.querySelector("#city").value;
      let raw = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`
      );
      let data = await raw.json();
      renderWeather(data);
      weather_data.classList.add("active");

      console.log(data);
    }
  } catch (error) {
    alert("Unable to fetch the data");
  }
});
