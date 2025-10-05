# Weather App

A modern, responsive weather application built with React, TypeScript, Vite, Tanstack query and Tailwind CSS.

## Features

### Core Features ✅

- **Search Bar**: Enter any city name to get weather information
- **OpenWeatherMap API Integration**: Real-time weather data with proper error handling
- **Current Weather Display**: Temperature, weather condition, and humidity
- **Responsive Design**: Works on all device sizes

### Bonus Features ⭐

- **Local Storage Integration**: Saves last searched city and recent searches
- **5-Day Weather Forecast**: Extended weather information
- **Recent Searches**: Quick access to previously searched cities
- **Current Location**: Get weather for your current location using geolocation
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui components
- **Icons**: Lucide React
- **Linting**: ESLint + Prettier for code quality
- **Api management**: Tanstack query

## Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Add your OpenWeatherMap API key to the `.env` file:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. **Get OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```
