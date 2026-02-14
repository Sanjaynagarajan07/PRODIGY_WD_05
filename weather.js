(function () {
    'use strict';

    // Using Open-Meteo API - Completely FREE, no API key required!
    // Documentation: https://open-meteo.com/en/docs
    const GEOCODE_API = 'https://geocoding-api.open-meteo.com/v1/search';
    const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const locationBtn = document.getElementById('locationBtn');
    const cityButtons = document.querySelectorAll('.city-btn');
    const weatherCard = document.getElementById('weatherCard');
    const errorMessage = document.getElementById('errorMessage');
    const loading = document.getElementById('loading');

    const cityName = document.getElementById('cityName');
    const date = document.getElementById('date');
    const temperature = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weatherIcon');
    const description = document.getElementById('description');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    const visibility = document.getElementById('visibility');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const tempRange = document.getElementById('tempRange');
    const errorText = document.getElementById('errorText');

    function showLoading() {
        loading.hidden = false;
        weatherCard.hidden = true;
        errorMessage.hidden = true;
    }

    function hideLoading() {
        loading.hidden = true;
    }

    function showError(msg) {
        errorText.textContent = msg || 'Unable to fetch weather data. Please try again.';
        errorMessage.hidden = false;
        weatherCard.hidden = true;
        hideLoading();
    }

    function formatTime(timeString) {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    function getWeatherIcon(weatherCode) {
        // WMO Weather interpretation codes
        const iconMap = {
            0: 'fa-solid fa-sun',           // Clear sky
            1: 'fa-solid fa-cloud-sun',     // Mainly clear
            2: 'fa-solid fa-cloud-sun',     // Partly cloudy
            3: 'fa-solid fa-cloud',         // Overcast
            45: 'fa-solid fa-smog',        // Fog
            48: 'fa-solid fa-smog',        // Depositing rime fog
            51: 'fa-solid fa-cloud-rain',   // Light drizzle
            53: 'fa-solid fa-cloud-rain',   // Moderate drizzle
            55: 'fa-solid fa-cloud-rain',   // Dense drizzle
            56: 'fa-solid fa-cloud-rain',   // Light freezing drizzle
            57: 'fa-solid fa-cloud-rain',   // Dense freezing drizzle
            61: 'fa-solid fa-cloud-rain',   // Slight rain
            63: 'fa-solid fa-cloud-rain',   // Moderate rain
            65: 'fa-solid fa-cloud-rain',   // Heavy rain
            66: 'fa-solid fa-cloud-rain',   // Light freezing rain
            67: 'fa-solid fa-cloud-rain',   // Heavy freezing rain
            71: 'fa-solid fa-snowflake',    // Slight snow
            73: 'fa-solid fa-snowflake',    // Moderate snow
            75: 'fa-solid fa-snowflake',    // Heavy snow
            77: 'fa-solid fa-snowflake',    // Snow grains
            80: 'fa-solid fa-cloud-rain',   // Slight rain showers
            81: 'fa-solid fa-cloud-rain',   // Moderate rain showers
            82: 'fa-solid fa-cloud-rain',   // Violent rain showers
            85: 'fa-solid fa-snowflake',    // Slight snow showers
            86: 'fa-solid fa-snowflake',    // Heavy snow showers
            95: 'fa-solid fa-bolt',         // Thunderstorm
            96: 'fa-solid fa-bolt',         // Thunderstorm with slight hail
            99: 'fa-solid fa-bolt'          // Thunderstorm with heavy hail
        };
        return iconMap[weatherCode] || 'fa-solid fa-sun';
    }

    function getWeatherDescription(weatherCode) {
        const descMap = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Light rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Light snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            80: 'Light rain showers',
            81: 'Moderate rain showers',
            82: 'Heavy rain showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Heavy thunderstorm'
        };
        return descMap[weatherCode] || 'Clear';
    }

    async function fetchWeatherByCoords(lat, lon, cityName) {
        showLoading();

        try {
            const url = WEATHER_API + '?latitude=' + lat + '&longitude=' + lon + 
                       '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl,visibility' +
                       '&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min' +
                       '&timezone=Asia/Kolkata';
            
            const response = await fetch(url);

            if (!response.ok) {
                showError('Unable to fetch weather data. Please try again later.');
                return;
            }

            const data = await response.json();
            showWeather(data, cityName || 'Current Location');
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        }
    }

    async function fetchWeatherByCity(city) {
        showLoading();

        try {
            // First, get coordinates for the city
            const geocodeUrl = GEOCODE_API + '?name=' + encodeURIComponent(city) + '&count=1&language=en&format=json';
            const geoResponse = await fetch(geocodeUrl);

            if (!geoResponse.ok) {
                showError('Unable to find city. Please check the spelling and try again.');
                return;
            }

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                showError('City not found. Please check the spelling and try again.');
                return;
            }

            const location = geoData.results[0];
            const lat = location.latitude;
            const lon = location.longitude;
            const name = location.name + (location.admin1 ? ', ' + location.admin1 : '') + (location.country ? ', ' + location.country : '');

            // Now fetch weather data
            await fetchWeatherByCoords(lat, lon, name);
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please check your connection and try again.');
        }
    }

    function showWeather(data, displayName) {
        const current = data.current;
        const daily = data.daily;

        cityName.textContent = displayName || 'Unknown Location';
        temperature.textContent = Math.round(current.temperature_2m);
        feelsLike.textContent = Math.round(current.temperature_2m) + '°C'; // Open-Meteo doesn't provide feels_like, using current temp
        humidity.textContent = Math.round(current.relative_humidity_2m) + '%';
        windSpeed.textContent = Math.round(current.wind_speed_10m * 3.6) + ' km/h';
        pressure.textContent = Math.round(current.pressure_msl) + ' hPa';
        
        if (current.visibility) {
            visibility.textContent = (current.visibility / 1000).toFixed(1) + ' km';
        } else {
            visibility.textContent = 'N/A';
        }
        
        if (daily.sunrise && daily.sunrise[0]) {
            sunrise.textContent = formatTime(daily.sunrise[0]);
        } else {
            sunrise.textContent = 'N/A';
        }
        
        if (daily.sunset && daily.sunset[0]) {
            sunset.textContent = formatTime(daily.sunset[0]);
        } else {
            sunset.textContent = 'N/A';
        }
        
        if (daily.temperature_2m_min && daily.temperature_2m_max) {
            tempRange.textContent = Math.round(daily.temperature_2m_min[0]) + '° / ' + Math.round(daily.temperature_2m_max[0]) + '°';
        } else {
            tempRange.textContent = 'N/A';
        }
        
        const weatherCode = current.weather_code;
        description.textContent = getWeatherDescription(weatherCode);
        const iconClass = getWeatherIcon(weatherCode);
        weatherIcon.innerHTML = '<i class="' + iconClass + '"></i>';

        const now = new Date();
        date.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        weatherCard.hidden = false;
        errorMessage.hidden = true;
        hideLoading();
    }

    function getCurrentLocation() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by your browser.');
            return;
        }

        showLoading();
        locationBtn.disabled = true;
        locationBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Getting location...';

        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
                locationBtn.disabled = false;
                locationBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Use My Location';
            },
            function (error) {
                locationBtn.disabled = false;
                locationBtn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Use My Location';
                
                let errorMsg = 'Unable to get your location. ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg += 'Please allow location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMsg += 'Location request timed out.';
                        break;
                    default:
                        errorMsg += 'An unknown error occurred.';
                        break;
                }
                showError(errorMsg);
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a city name.');
            return;
        }
        fetchWeatherByCity(city);
    }

    // Event listeners
    searchForm.addEventListener('submit', handleSubmit);
    locationBtn.addEventListener('click', getCurrentLocation);

    // Tamil Nadu city buttons
    cityButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            const lat = this.getAttribute('data-lat');
            const lon = this.getAttribute('data-lon');
            cityInput.value = city;
            fetchWeatherByCoords(lat, lon, city + ', Tamil Nadu');
        });
    });

    // Check API status on page load
    window.addEventListener('DOMContentLoaded', function() {
        console.log('✅ Weather App Ready - Using Open-Meteo API (Free, No API Key Required)');
    });
})();
