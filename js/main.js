import codes from './weatherCode.js';
import coordinates from './coordinates.js';

$(document).ready(function(){
    loadWeather();
})

// Loading basic weather data temperature,timezone,condition

function loadWeather(){
        let row=0;
        while(row < 3){
            if(row == 0){
                let data = fetch(coordinates.warsaw.url).then((res) => res.json());
                data.then((data) => {
                    $(".main .region")[0].innerHTML = "Warsaw";
                    $(".main .temp")[0].innerHTML = "Temperature : "+data.current_weather.temperature + " <sup>o</sup>C";
                    $(".main .icon")[0].innerHTML = "<img src=./img/icons/"+codes[data.current_weather.weathercode].icon+">";
                    $(".main .status")[0].innerHTML = "condition : "+codes[data.current_weather.weathercode].name;  
                })
            }else if(row == 1){
                let data = fetch(coordinates.newYork.url).then((res) => res.json());
                data.then((data) => {
                    $(".main .region")[1].innerHTML = "New York";
                    $(".main .temp")[1].innerHTML = "Temperature : "+data.current_weather.temperature + " <sup>o</sup>C";
                    $(".main .icon")[1].innerHTML = "<img src=./img/icons/"+codes[data.current_weather.weathercode].icon+">";
                    $(".main .status")[1].innerHTML = "condition : "+codes[data.current_weather.weathercode].name;  
                  })
             }else if(row ==2){
                let data = fetch(coordinates.beijing.url).then((res) => res.json());
                data.then((data) => {
                    console.log(codes[data.current_weather.weathercode].icon)
                    $(".main .region")[2].innerHTML = "beijing";
                    $(".main .temp")[2].innerHTML = "Temperature : "+data.current_weather.temperature + " <sup>o</sup>C";
                    $(".main .icon")[2].innerHTML = "<img src=./img/icons/"+codes[data.current_weather.weathercode].icon+">";
                    $(".main .status")[2].innerHTML = "condition : "+codes[data.current_weather.weathercode].name;  
                  })
             }
            row++;
        }

}   
