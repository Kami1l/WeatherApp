import coordinates from './coordinates.js';
import code from './weatherCode.js'

$(document).ready(function(){
    console.log(coordinates);
    console.log(localStorage.getItem("sekcja"),localStorage.getItem("item"));
    if(localStorage.getItem("sekcja") == 0){
        console.log(coordinates[Number(localStorage.getItem("item"))]);
        load(Number(localStorage.getItem("item")))
    }else {
        console.log(coordinates[Number(localStorage.getItem("item"))+3]);
        load(Number(localStorage.getItem("item"))+3);
    }

})

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

async function load(item){
    
    let res = await fetch(coordinates[item].url)
    let json = await res.json();
    $(".main__theme")[0].innerHTML = coordinates[localStorage.getItem("item")].name;
    $(".actualTime__day")[0].innerHTML = json.current_weather.time.slice(0,10) + " Day";
    $(".actualTime__time")[0].innerHTML = json.current_weather.time.slice(11,16) + " : Time";
    $(".weather__temperature")[0].innerHTML = Math.round(json.current_weather.temperature) + " <sup>o</sup>C";
    $(".weather__condition")[0].innerHTML = "Weather : " + code[json.current_weather.weathercode].name;
    $(".weather__wind")[0].innerHTML = json.current_weather.windspeed + " kmh";

    if(json.daily.uv_index_max[0] == null){
        $(".air__uv")[0].innerHTML = "UV : No data available";
    }else{

        $(".air__uv")[0].innerHTML = "UV : "+json.daily.uv_index_max[0];
    }1

    let midPressure=0;
    for(let i=0;i<json.hourly.surface_pressure.length/7;i++){
        midPressure += json.hourly.surface_pressure[i];
    }
    midPressure = midPressure /(json.hourly.surface_pressure.length/7);
    console.log(Math.floor(midPressure), "średnia");
    $(".air__pm")[0].innerHTML = "(average) " + Math.floor(midPressure)+ " hPa";
    $(".air__station")[0].innerHTML = "Station : "+coordinates[localStorage.getItem("item")].name;

    let midDayTemp = 0;
    let midDayCondition=[];

    let midNightTemp = 0;
    let midNightCondition=[];

    for(let i=6;i<=18;i++){
        midDayTemp += json.hourly.temperature_2m[i];
        midDayCondition.push(json.hourly.weathercode[i]);
    }
    for(let i =19;i<=30;i++){
        midNightTemp += json.hourly.temperature_2m[i];
        midNightCondition += json.hourly.weathercode[i];
    }

    midNightTemp = Math.round((midNightTemp/11)*10)/10;
    midDayTemp = Math.round((midDayTemp /12)*10)/10;
    console.log(json);
    $(".night__icon")[0].innerHTML = '<img src="../img/icons/'+code[mode(midDayCondition)].icon+'">';
    $(".day__icon")[0].innerHTML = '<img src="../img/icons/'+code[mode(midNightCondition)].icon+'">';

    $(".day__temperature")[0].innerHTML = midDayTemp;
    $(".night__temperature")[0].innerHTML = midNightTemp;

    $(".night__condition")[0].innerHTML = code[mode(midNightCondition)].name;
    $(".day__condition")[0].innerHTML = code[mode(midDayCondition)].name;
    // $(".night__condition")[0].innerHTML = midNightCondition;
}


