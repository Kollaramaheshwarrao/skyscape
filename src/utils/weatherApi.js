// Using free weather API service
const BASE_URL = 'https://api.open-meteo.com/v1';

export const getWeatherByCity = async (city) => {
  try {
    // First get coordinates from city name using free geocoding
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found');
    }
    
    const { latitude, longitude, name, country } = geoData.results[0];
    
    // Get weather data using coordinates
    const weatherResponse = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    
    const weatherData = await weatherResponse.json();
    
    // Transform to match OpenWeatherMap format
    return {
      name: `${name}, ${country}`,
      main: {
        temp: weatherData.current.temperature_2m,
        feels_like: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m
      },
      weather: [{
        main: getWeatherCondition(weatherData.current.weather_code),
        description: getWeatherDescription(weatherData.current.weather_code)
      }],
      wind: {
        speed: weatherData.current.wind_speed_10m
      },
      coord: { lat: latitude, lon: longitude }
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const weatherResponse = await fetch(
      `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    
    const weatherData = await weatherResponse.json();
    
    return {
      name: 'Current Location',
      main: {
        temp: weatherData.current.temperature_2m,
        feels_like: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m
      },
      weather: [{
        main: getWeatherCondition(weatherData.current.weather_code),
        description: getWeatherDescription(weatherData.current.weather_code)
      }],
      wind: {
        speed: weatherData.current.wind_speed_10m
      },
      coord: { lat, lon }
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getForecast = async (city) => {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      return null;
    }
    
    const { latitude, longitude } = geoData.results[0];
    
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    );
    
    const forecastData = await forecastResponse.json();
    
    return {
      list: forecastData.daily.time.map((date, index) => ({
        dt: new Date(date).getTime() / 1000,
        main: {
          temp: forecastData.daily.temperature_2m_max[index]
        },
        weather: [{
          main: getWeatherCondition(forecastData.daily.weather_code[index])
        }]
      }))
    };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

// Weather code mapping for Open-Meteo
const getWeatherCondition = (code) => {
  if (code <= 3) return 'Clear';
  if (code <= 48) return 'Clouds';
  if (code <= 67 || (code >= 80 && code <= 82)) return 'Rain';
  if (code <= 77 || (code >= 85 && code <= 86)) return 'Snow';
  return 'Clear';
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    71: 'slight snow',
    73: 'moderate snow',
    75: 'heavy snow',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'violent rain showers'
  };
  return descriptions[code] || 'clear sky';
};

export const getLocationImage = (location) => {
  const cityName = location.split(',')[0].trim();
  
  // Expanded collection of stunning area-specific images
  const locationImages = {
    // Major Cities - Iconic Views
    'London': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1920&q=80',
    'Paris': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
    'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80',
    'Sydney': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
    'Mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    'Berlin': 'https://images.unsplash.com/photo-1587330979470-3346b2efb4c1?w=1920&q=80',
    'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80',
    'Barcelona': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=80',
    
    // European Cities
    'Amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1920&q=80',
    'Prague': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920&q=80',
    'Vienna': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1920&q=80',
    'Istanbul': 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80',
    'Budapest': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920&q=80',
    'Zurich': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'Stockholm': 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1920&q=80',
    'Copenhagen': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1920&q=80',
    
    // Asian Cities
    'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80',
    'Hong Kong': 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&q=80',
    'Seoul': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
    'Bangkok': 'https://images.unsplash.com/photo-1563492065-1a83d0c8b6eb?w=1920&q=80',
    'Kuala Lumpur': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80',
    'Jakarta': 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&q=80',
    'Manila': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
    
    // American Cities
    'Los Angeles': 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=1920&q=80',
    'Chicago': 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=1920&q=80',
    'San Francisco': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'Miami': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'Las Vegas': 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=1920&q=80',
    'Toronto': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&q=80',
    'Vancouver': 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?w=1920&q=80',
    
    // Middle East & Africa
    'Cairo': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1920&q=80',
    'Tel Aviv': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1920&q=80',
    'Cape Town': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80',
    'Marrakech': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1920&q=80',
    
    // South America
    'Rio de Janeiro': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1920&q=80',
    'Buenos Aires': 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1920&q=80',
    'Lima': 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1920&q=80',
    
    // Oceania
    'Melbourne': 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1920&q=80',
    'Auckland': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80',
    
    // Indian Cities
    'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80',
    'Bangalore': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    'Chennai': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80',
    'Kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1920&q=80'
  };
  
  // Try exact match first
  if (locationImages[cityName]) {
    return locationImages[cityName];
  }
  
  // Try partial matches for compound city names
  const cityKey = Object.keys(locationImages).find(key => 
    cityName.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(cityName.toLowerCase())
  );
  
  if (cityKey) {
    return locationImages[cityKey];
  }
  
  // Default scenic images for unknown cities
  const defaultImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'
  ];
  
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};