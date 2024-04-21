document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'e8f8498df5f067ba1e99807aa9e9b8dd'; // Ensure this is your actual API key

    async function fetchWeather(apiKey, lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.weather) {
                // Round the temperature to the nearest whole number
                const temperature = Math.round(data.main.temp);
                return `${data.weather[0].description}, ${temperature}°F`;
            } else {
                throw new Error('Weather data not available');
            }
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            return 'Weather not available';
        }
    }

    async function displayWeather() {
        const weatherElement = document.getElementById('weatherDisplay');
        if (!weatherElement) {
            console.log('Weather display element not found');
            return;
        }

        const grantsPassWeather = await fetchWeather(apiKey, 42.4711, -123.3414); // Latitude and Longitude for Grants Pass
        const vancouverWeather = await fetchWeather(apiKey, 45.6679, -122.5401); // Latitude and Longitude for Vancouver
        
        weatherElement.innerHTML = `<strong>Grants Pass:</strong> ${grantsPassWeather} | <strong>Vancouver:</strong> ${vancouverWeather}`;
    }

    displayWeather();
});
