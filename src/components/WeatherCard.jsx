import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';
import { getWeatherMood, getComfortLevel } from '../utils/weatherHelpers';

const WeatherCard = ({ weather, backgroundImage }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition) => {
    if (condition.includes('rain')) return <CloudRain className="w-8 h-8" />;
    if (condition.includes('snow')) return <CloudSnow className="w-8 h-8" />;
    if (condition.includes('cloud')) return <Cloud className="w-8 h-8" />;
    return <Sun className="w-8 h-8" />;
  };

  const comfort = getComfortLevel(weather.main.temp, weather.main.humidity, weather.wind.speed);
  const mood = getWeatherMood(weather.main.temp, weather.weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-4">
        <h2 className="font-script text-2xl text-white mb-2">{weather.name}</h2>
        <div className="flex items-center justify-center gap-3 text-white">
          {getWeatherIcon(weather.weather[0].main.toLowerCase())}
          <span className="text-4xl font-light">{Math.round(weather.main.temp)}°</span>
          <span className="text-2xl">{mood}</span>
        </div>
        <p className="text-white/80 capitalize">{weather.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-white/90">
          <Thermometer className="w-4 h-4" />
          <span>Feels {Math.round(weather.main.feels_like)}°</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Droplets className="w-4 h-4" />
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Wind className="w-4 h-4" />
          <span>{Math.round(weather.wind.speed)} m/s</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
          <span>{Math.round(comfort)}% comfort</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;