# Weather App

A modern, responsive weather application that fetches real-time weather data using the OpenWeatherMap API.

## Features

- 🌍 **Search by City**: Enter any city name to get weather information
- 📍 **Use Current Location**: Automatically detect your location using GPS
- 🌡️ **Comprehensive Weather Data**: 
  - Current temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Atmospheric pressure
  - Visibility
  - Sunrise/Sunset times
  - Min/Max temperature range
- 🎨 **Modern UI**: Clean, dark-themed interface
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Step 1: Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to [API Keys](https://home.openweathermap.org/api_keys)
4. Create a new API key (it may take a few minutes to activate)

### Step 2: Add Your API Key

1. Open `weather.js` file
2. Find this line:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

### Step 3: Run the App

1. Open `index.html` in your web browser
2. Allow location access when prompted (for "Use My Location" feature)
3. Start searching for weather!

## Usage

### Search by City
- Type a city name in the search box
- Press Enter or click the search button
- Weather information will be displayed

### Use Current Location
- Click the "Use My Location" button
- Allow location access in your browser
- Weather for your current location will be displayed automatically

## API Information

This app uses the **OpenWeatherMap Current Weather Data API**:
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Free Tier**: 60 calls/minute, 1,000,000 calls/month
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/api)

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Note**: Geolocation requires HTTPS in production. For local testing, `localhost` works fine.

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `weather.js` - JavaScript logic and API integration
- `README.md` - This file

## License

Free to use and modify. Weather data provided by OpenWeatherMap.
