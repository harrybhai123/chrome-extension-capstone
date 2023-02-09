const auther = document.getElementById("auther");
const cryptoName = document.getElementById("crypto-name");
const cryptoImg = document.getElementById("crypto-img");
const currentPrice = document.getElementById("currentPrice");
const twentyFourHourHigh = document.getElementById("24HourHigh");
const twentyFourHourLow = document.getElementById("24HourLow");
const currentTime = document.getElementById("time");
const currentdate = document.getElementById("date");
const weatherIcon = document.getElementById("icon");
const weatherTemp = document.getElementById("temp");
const weatherCity = document.getElementById("city");
const qus = document.getElementById("qus");
const ans = document.getElementById("ans");
const timeGreet = document.getElementById("timeGreet");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape" /* &query=nature */
)
  .then((res) => {
    if (!res.ok) {
      throw error("data is not avilable");
    }
    return res.json();
  })
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    auther.innerText = `Auther Name: ${data.user.name}`;
  })
  .catch((err) => {
    console.log(err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1673981171900-020cb6983841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzU3NjgwNjc&ixlib=rb-4.0.3&q=80&w=1080)`;
    auther.innerText = `Auther Name: Default`;
  });

// bitcoin Prices
function bitcoinPrices() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true&community_data=true"
  )
    .then((res) => {
      if (!res.ok) {
        throw error("data is not avilable");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data)
      cryptoName.innerText = data.name;
      cryptoImg.src = data.image.small;

      currentPrice.innerText = `Current Price: ₹${data.market_data.current_price.inr}`;
      twentyFourHourHigh.innerText = `24h High: ₹${data.market_data.high_24h.inr}`;
      twentyFourHourLow.innerText = `24h Low: ₹${data.market_data.low_24h.inr}`;
    })
    .catch((err) => {
      console.error(err);
    });
}

setInterval(bitcoinPrices, 1000);

// time and date
function getTimeAndDate() {
  let date = new Date();
  let hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "Good Morning 🌄";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Good Afternoon 🕑";
  } else {
    timeOfDay = "Good Night 😴";
  }

  timeGreet.textContent = timeOfDay;
  currentTime.textContent = date.toLocaleTimeString("en-in");
  /* `${time.getHours()} : ${time.getMinutes()}` */

  currentdate.innerText = date.toLocaleDateString("en-in");
  /* `${time.getMonth()}-${time.getDate()}-${time.getFullYear()}` */
}

setInterval(getTimeAndDate, 1000);

// weather
function weather() {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    )
      .then((res) => {
        if (!res.ok) {
          throw error("Weather data not avilable");
        }
        return res.json();
      })
      .then((data) => {
        //   console.log(data);

        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherTemp.innerText = `${data.main.temp}°`;
        weatherCity.innerText = `City: ${data.name}`;
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
setInterval(weather, 1000);

// https://v2.jokeapi.dev/joke/Any?blacklistFlags=sexist

fetch("index.json")
  .then((res) => {
    if (!res.ok) {
      throw error("data not avilable");
    }
    return res.json();
  })
  .then((data) => {
      let randomJokeQ = Math.ceil(Math.random() * data.length);
      let randomJokeA = Math.ceil(Math.random() * data.length);

      qus.innerText = `Q:-  ${data[randomJokeQ].setup}`;
      ans.innerText = `A:-  ${data[randomJokeA].punchline}`;

  })
  .catch((err) => {
    console.log(err);
  });
