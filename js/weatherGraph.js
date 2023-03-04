import coordinates from "./coordinates.js";
import code from "./weatherCode.js";

$(document).ready(function(){
    drawChart();
})

//! WRZUCIĆ Weathergrap do tych zakładech jako 3 tam gdize jest soon ! i będzie koox chyba

const ctx = document.getElementById('myChart');

async function drawChart(){

  let res = await fetch(coordinates[1].url)
  let json = await res.json();

  let avg=[];
  let loopRange =json.hourly.temperature_2m.length/7;
  let sum=0;
  let i = 0;

  for(let j=0;j<json.hourly.temperature_2m.length/24;j++){

    while(i<loopRange){
      sum += json.hourly.temperature_2m[i];
      i++;
    }
    sum = Math.round(sum/24);
    avg.push(sum);
    i=loopRange;

    loopRange+=24;
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
      datasets: [{
        label: 'Temperature (Celsius)',
        data: [avg[0], avg[1], avg[2], avg[3], avg[4], avg[5],avg[6]],
        borderWidth: 2,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stacked: true
        }
      }
    }
  });
}
