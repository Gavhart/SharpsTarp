document.addEventListener("DOMContentLoaded", function() {
    const apiKeys = {
        grantsPass: 'e8f8498df5f067ba1e99807aa9e9b8dd',
        vancouver: 'e8f8498df5f067ba1e99807aa9e9b8dd'   // Replace if using different keys or just one key
    };

    async function fetchWeather(apiKey, lat, lon) {
        const url = `https://home.openweathermap.org/api_keys/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return `${data.weather[0].description}, ${data.main.temp}°C`;
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            return 'Weather not available';
        }
    }

    async function displayWeather() {
        const weatherElement = document.getElementById('weatherDisplay');
        const grantsPassWeather = await fetchWeather(apiKeys.grantsPass, 42.4711, -123.3414); // Latitude and Longitude for Grants Pass
        const vancouverWeather = await fetchWeather(apiKeys.vancouver, 45.6679, -122.5401); // Latitude and Longitude for Vancouver
        
        weatherElement.innerHTML = `<strong>Grants Pass:</strong> ${grantsPassWeather} | <strong>Vancouver:</strong> ${vancouverWeather}`;
    }

    displayWeather();
});
