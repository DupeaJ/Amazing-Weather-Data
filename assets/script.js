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
        "&units=imperial&lang=en&units=standard" +
        APIKey
    )
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            // console.log(dt);
            for (let i = 7; i < data.list.length; i += 7) {
                 const temp = data.list[i].main.temp;
                 const speed = data.list[i].wind.speed;
                 const humidity = data.list[i].main.humidity;
                const dt = data.list[i].dt;
                const formattedDate = dayjs.unix(dt).format("M/D/YY");
                const elementId = "#forcast-day-" + Math.ceil((i + 0) / 7);
                    $(elementId).text(formattedDate)
            
            
                const tempElementId = "#temp-day-" + Math.ceil((i + 0) / 7);
                    $(tempElementId).text(temp)
                    
                const speedElementId = "#wind-day-" + Math.ceil((i + 0) / 7);
                $(speedElementId).text(speed)
                
                const humidityElementId = "#humidity-day-" + Math.ceil((i + 0) / 7);
                $(humidityElementId).text(humidity)

                const icon = data.list[i].weather[0].icon;
                const iconElementId = "#icon-day-" + Math.ceil((i + 0) / 7);

                fetch("https://openweathermap.org/img/wn/" + icon + "@2x.png")
                .then(function (response) {
                    return response.blob();
                })
                .then(function (blob) {
                    const weatherIconURL = URL.createObjectURL(blob);
                    $(iconElementId).attr("src", weatherIconURL);
                });
            };
            //Current weather fetch
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
                    const icon = data.weather[0].icon

                    $("#city-name").text(
                        name + " (" + dayjs.unix(dt).format("M/D/YY") + ")"
                    );
                    $("#temperature").text("Temperature: " + temp + "°");
                    $("#wind-speed").text("Wind Speed: " + speed + " mph");
                    $("#humidity").text("Humidity: " + humidity + " %");
                    // const icon = weather[0].icon;
                    const weatherI = "#weather-icon"
                    fetch(
                        "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                    )
                        .then(function (response) {
                            return response.blob();
                        })
                        .then(function (blob) {
                            const weatherIconURL = URL.createObjectURL(blob);
                            $(weatherI).attr("src", weatherIconURL);
                        });
                });

            
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
