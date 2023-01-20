export let coordinates = {
    warsaw : {
        name : "Warsaw",
        Latitude : "52,23",
        Longitude : "21,01",
        url : "https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&hourly=temperature_2m,weathercode&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin"
    },
    newYork : {
        name : "New York",
        Latitude : "40,71",
        Longitude : "-74,01",
        url : "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,weathercode&daily=weathercode&current_weather=true&timezone=America%2FNew_York"
    },
    beijing : {
        name : "Beijing",
        Latitude : "39,91",
        Longitude : "116,40",
        url : "https://api.open-meteo.com/v1/forecast?latitude=39.91&longitude=116.40&hourly=temperature_2m,weathercode&daily=weathercode&current_weather=true&timezone=Asia%2FTokyo"
    }
}

export default coordinates;