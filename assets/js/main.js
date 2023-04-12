const weather = {
    apiKey: "82fe410fa647feeef59037e82ff3580d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name, dt } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, feels_like } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        const unixTimestamp = data.dt;
        const date = new Date(unixTimestamp * 1000);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', options);
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".city").innerText = name;
        document.querySelector(".date").innerText = formattedDate;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".country").innerText = "Country: " + country;
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".app").style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Chisinau")