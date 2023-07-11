var Url = 'https://api.openweathermap.org/data/2.5/weather'
var APIKey = '&appid=15595d15dec005d68868dea8d15d024a'

function call(){
    fetch(Url+'?q=Portland'+APIKey)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}
call();