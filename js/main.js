import codes from './weatherCode.js';
import coordinates from './coordinates.js';

$(document).ready(function(){
    let row = 0
    while(row < 6){
        fetcher(row)
        row++;
    }
})

// Loading basic weather data temperature,timezone,condition

async function fetcher(i){
    let res = await fetch(coordinates[i].url)
    let json = await res.json();
                $(".main .region")[i].innerHTML = coordinates[i].name;
            if(json.current_weather.temperature > 0){
                $(".main .temp")[i].innerHTML = "Temperature : "+json.current_weather.temperature + " <sup>o</sup>C" + "<img src=./img/icons/hot.png>";
            }else {
                $(".main .temp")[i].innerHTML = "Temperature : "+json.current_weather.temperature + " <sup>o</sup>C" + "<img src=./img/icons/cold.png>";
            }
            $(".main .icon")[i].innerHTML = "<img src=./img/icons/"+codes[json.current_weather.weathercode].icon+">";
            $(".main .status")[i].innerHTML = "condition : "+codes[json.current_weather.weathercode].name; 
    console.log(json);
}
