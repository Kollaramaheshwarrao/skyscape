import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from './hooks/useWeather';
import { getTimeOfDay, getWeatherGradient } from './utils/weatherHelpers';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import BackgroundImage from './components/BackgroundImage';
import WeatherParticles from './components/WeatherParticles';
import ForecastCard from './components/ForecastCard';

function App() {
  const { weather, forecast, loading, error, currentCity, fetchWeather, fetchWeatherByLocation } = useWeather();
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const backgroundGradient = weather 
    ? getWeatherGradient(weather.weather[0].main.toLowerCase(), timeOfDay)
    : 'from-blue-900 via-purple-900 to-indigo-900';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden`}>
      <BackgroundImage location={currentCity} weather={weather} />
      
      {weather && (
        <WeatherParticles condition={weather.weather[0].main.toLowerCase()} />
      )}

      <div className="relative z-20 container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Sky<span className="font-script text-yellow-300">Scape</span>
          </h1>
          <p className="text-white/80 text-lg">Weather as You've Never Seen Before</p>
        </motion.header>

        <SearchBar 
          onSearch={fetchWeather}
          onLocationSearch={fetchWeatherByLocation}
          loading={loading}
        />

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2">Loading weather data...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-300 bg-red-900/20 p-4 rounded-lg max-w-md mx-auto"
          >
            {error}
          </motion.div>
        )}

        {weather && !loading && (
          <div className="space-y-4">
            <WeatherCard weather={weather} />
            <ForecastCard forecast={forecast} />
          </div>
        )}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-white/60"
        >
          <p className="text-sm">Experience weather like never before</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;