const url = "https://api.openweathermap.org/data/2.5/forecast?";
const APIKey = "&appid=15595d15dec005d68868dea8d15d024a";
var tempInput = document.querySelector("#temperature");
const searchButton = document.querySelector(".search-button");
const userInputField = document.getElementById("city-search");

function callWeather() {
    const userInput = document.getElementById("city-search").value;
    console.log(userInput);

    localStorage.setItem("search history", userInput);
    fetch(
        url +
            "q=" +
            userInput +
            "&units=imperial&lang=en&cnt=5&units=standard" +
            APIKey
    )
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            const name = data.city.name;
            const temp = data.list[0].main.temp;
            const speed = data.list[0].wind.speed;
            const humidity = data.list[0].main.humidity;
            const date = data.list[0].dt_txt;
            const dt = data.list[4].dt;
            console.log(data);
            console.log(dt);

            
            $("#forcast-day-1").text(dayjs.unix(dt).format("M/D/YY"));

            const icon = data.list[0].weather[0].icon;
            fetch("https://openweathermap.org/img/wn/" + icon + "@2x.png")
                .then(function (response) {
                    return response.blob();
                })
                .then(function (blob) {
                    const weatherIconURL = URL.createObjectURL(blob);
                    document.getElementById("weather-icon").src =
                        weatherIconURL;
                })
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?q=" +
                        userInput +
                    "&units=imperial&lang=en&cnt=5&units=standard" +
                    APIKey
                )
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        const name = data.name;
                        const temp = data.main.temp;
                        const speed = data.wind.speed;
                        const humidity = data.main.humidity;
                        const dt = data.dt;

                        $("#city-name").text(name+" (" +dayjs.unix(dt).format("M/D/YY")+")");;
                        $("#temperature").text("Temperature: " + temp + "°");
                        $("#wind-speed").text("Wind Speed: " + speed + " mph");
                        $("#humidity").text("Humidity: " + humidity + " %");


            })

            console.log(speed);
            console.log(humidity);
        })

        .catch((error) => {
            console.log(error);
        });
    displayBtn();
}

function displayBtn() {
    const searchHistory = localStorage.getItem("search history");
    console.log(searchHistory);
    if (searchHistory) {
        const search = document.getElementById("search-history-container");
        const scoreBtn = document.createElement("button");
        scoreBtn.textContent = searchHistory;
        search.appendChild(scoreBtn);
    }
}

searchButton.addEventListener("click", callWeather);
userInputField.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        callWeather();
    }
});
