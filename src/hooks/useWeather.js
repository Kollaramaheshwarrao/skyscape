import { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByCoords, getForecast } from '../utils/weatherApi';

export const useWeather = (initialCity = 'London') => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(initialCity);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecast(city)
      ]);
      
      if (weatherData) {
        setWeather(weatherData);
        setCurrentCity(city);
      } else {
        setError('City not found');
      }
      
      if (forecastData) {
        setForecast(forecastData);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        
        try {
          const weatherData = await getWeatherByCoords(latitude, longitude);
          if (weatherData) {
            setWeather(weatherData);
            setCurrentCity(weatherData.name);
          }
        } catch (err) {
          setError('Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      () => setError('Location access denied')
    );
  };

  useEffect(() => {
    fetchWeather(initialCity);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    currentCity,
    fetchWeather,
    fetchWeatherByLocation
  };
};