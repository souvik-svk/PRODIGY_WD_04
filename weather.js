const apiKey = '6391d3875de736da102a2910f41c3d5c'

async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (!location) {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${'6391d3875de736da102a2910f41c3d5c'}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = '<p>Location not found. Please try again.</p>';
            return;
        }

        const { main, weather, name } = data;
        weatherInfo.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>${weather[0].description}</p>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Pressure: ${main.pressure} hPa</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    }
}
console.log("Script Loaded");
