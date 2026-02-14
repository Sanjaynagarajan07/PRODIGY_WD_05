# Quick Setup Guide

## Add Your OpenWeatherMap API Key

### Step 1: Get Your Free API Key

1. **Visit OpenWeatherMap**: https://openweathermap.org/api
2. **Click "Sign Up"** (top right corner)
   - Free account - No credit card required
   - Takes 2 minutes to sign up
3. **Verify your email** (check your inbox)
4. **Go to API Keys**: https://home.openweathermap.org/api_keys
5. **Copy your API key** (it looks like: `abc123def456ghi789jkl012mno345pq`)

### Step 2: Add API Key to weather.js

1. Open `weather.js` file
2. Find this line (around line 13):
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'abc123def456ghi789jkl012mno345pq';
   ```
   ⚠️ **Important**: Keep the quotes around your API key!

### Step 3: Test the App

1. Open `index.html` in your browser
2. Open browser console (F12) - you should see: `✅ OpenWeatherMap API key is set`
3. Try searching for a city or click "Use My Location"

## Example

**Before:**
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

**After (with your real key):**
```javascript
const API_KEY = 'your-actual-api-key-here';
```

## Troubleshooting

- **"Please add your OpenWeatherMap API key"**: You haven't replaced `YOUR_API_KEY_HERE` yet
- **"Invalid API key"**: Check that you copied the entire key correctly
- **"City not found"**: Try a different city name or check spelling
- **Location not working**: Make sure you allow location access in your browser

## Free Tier Limits

- ✅ 60 API calls per minute
- ✅ 1,000,000 API calls per month
- ✅ Perfect for personal use!

---

**Need help?** Check the full README.md file for more details.
