const appId = '15949fcad4ee2e1777f8f42e57006be3'
let units = 'metric'
let searchMethod = 'q'

/* Search with ZIP code. US only, so useless to me (for now)

function getSearchMethod(searchTerm){
    if(searchTerm.lenght === 5 && Number.parseInt(searchTerm+'' ===searchTerm)){
        searchMethod = 'zip'
    } else{
        searchMethod = 'q'
    }
} */

function searchWeather(searchTerm){
    /* getSearchMethod(searchTerm) */
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then((result) => {
        return result.json()
    }).then((result) =>{
        init(result)
    })
}

function init(resultFromServer) {
    switch(resultFromServer.weather[0].main){ // first item array Json
        case 'Clear':
            document.body.style.backgroundImage = 'url(./Pics/clear.jpg)'
            break

        case 'Clouds':
            document.body.style.backgroundImage = 'url(./Pics/cloudy.jpg)'
            break

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url(./Pics/rainy.jpg)'
            break

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url(./Pics/thnder.jpg)'
            break
            
        case 'Snow':
            document.body.style.backgroundImage = 'url(./Pics/snow.jpg)'
            break
        default:
            break
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')

    let temperatureElement = document.getElementById('temperature')

    let humidityElement = document.getElementById('humidity')

    let windSpeed = document.getElementById('windSpeed')

    let cityName = document.getElementById('cityName')

    let weatherIcon = document.getElementById('docImg')

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png'

    let resultDescription = resultFromServer.weather[0].description
    weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#8451' // &#8451 html code for ºC, btw, unicode = U+02103

    windSpeed.innerHTML = 'Velocidade do vento é de ' + Math.floor(resultFromServer.wind.speed) + ' metros por segundo'

    cityName.innerHTML = resultFromServer.name

    humidityElement.innerHTML = 'A humidade do ar é de ' + resultFromServer.main.humidity + '%'

    setContainerWeatherPosition ()
    /* console.log(resultFromServer) */
}

function setContainerWeatherPosition () {
    let weatherContainer = document.getElementById('weatherContainer')
    let weatherContainerHeight = weatherContainer.clientHeight
    let weatherContainerWidth = weatherContainer.clientWidth

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`

    weatherContainer.style.visibility = 'visible'

}

document.getElementById('searchBtn').addEventListener('click', ()=>{
    let searchTerm = document.getElementById('searchInput').value
    if(searchTerm){
        searchWeather(searchTerm)
    }
})

document.getElementById('searchInput').addEventListener('keypress', ()=>{
    if(event.keyCode ===13){
        let searchTerm = document.getElementById('searchInput').value
        if(searchTerm){
        searchWeather(searchTerm)
        }
    }
})