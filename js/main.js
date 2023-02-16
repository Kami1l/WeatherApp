import codes from './weatherCode.js';
import coordinates from './coordinates.js';

$(document).ready(function(){
    click();
    let row = 0
    while(row < 6){
        fetcher(row)
        row++;
    }
})

export class option {
    constructor(section,number){
        this.section = section
        this.number = number
    }
}

//! Loading basic weather data temperature,timezone,condition

async function fetcher(i){
    let res = await fetch(coordinates[i].url)
    let json = await res.json();
    console.log(json);
                $(".main .region")[i].innerHTML = coordinates[i].name;
            if(json.current_weather.temperature > 0){
                $(".main .temp")[i].innerHTML = "Temperature : "+json.current_weather.temperature + " <sup>o</sup>C" + "<img src=./img/icons/hot.png>";
            }else {
                $(".main .temp")[i].innerHTML = "Temperature : "+json.current_weather.temperature + " <sup>o</sup>C" + "<img src=./img/icons/cold.png>";
            }
                $(".main .icon")[i].innerHTML = "<img src=./img/icons/"+codes[json.current_weather.weathercode].icon+">";
                $(".main .status")[i].innerHTML = "condition : "+codes[json.current_weather.weathercode].name; 
}

//! Checking region name for fetch 
//? Zrobić wybieranie danego regionu i szczegółowe info !!!!!
function click(){

    let name;
    let box;
    let array = []
    for(let i=0;i<$("section").length;i++){
        for(let j=0;j<$("section")[i].children.length;j++){
            array.push($("section")[i].children[j]);
        }
    }   
    console.log(array);
    let numberOfBox = array.length;
    $(window).on("click",function(e){
        if(e.target.parentNode.parentNode.className == "main__block block"){
            name = e.target.parentNode.parentNode.childNodes[1];
            box = e.target.parentNode.parentNode.parentNode.parentNode;

        }else if(e.target.parentNode.parentNode.className == "main__status"){
            name = e.target.parentNode.parentNode.parentNode.childNodes[1];
            box = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            
        }else if(e.target.className ==  "mask"){
            name = "mask"
        }
        else{
            name = e.target.parentNode.parentNode.childNodes[1].childNodes[1];
            box = e.target.parentNode.parentNode.parentNode;
        }
        console.log(name,box);



        // if(block i jego child ma inner np warszawa to jest to 0 itd i tak 5 razy)
        if(box == $("section")[0]){
            localStorage.setItem("sekcja",0);
            if(name.innerHTML == "Warsaw" ){
                console.log(coordinates[0].name,"0");
                localStorage.setItem("item",0);
            }else if(name.innerHTML == "New York"){
                console.log(coordinates[1].name,"1");
                localStorage.setItem("item",1);
            }else if(name.innerHTML == "Beijing"){
                console.log(coordinates[2].name,"2");
                localStorage.setItem("item",2);
            }
        }else{
            localStorage.setItem("sekcja",1);
            if(name.innerHTML == "Georgetown" ){
                console.log(coordinates[3].name,"0");
                localStorage.setItem("item",0);
            }else if(name.innerHTML == "Kinshasa"){
                console.log(coordinates[4].name,"1");
                localStorage.setItem("item",1);
            }else if(name.innerHTML == "Sydney"){
                console.log(coordinates[5].name,"2");
                localStorage.setItem("item",2);
            }

        }
    })
    $(window).on("click",function(e){

    })
}