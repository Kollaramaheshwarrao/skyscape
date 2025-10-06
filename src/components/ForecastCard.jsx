import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  const getWeatherIcon = (condition) => {
    if (condition.includes('rain')) return <CloudRain className="w-5 h-5" />;
    if (condition.includes('snow')) return <CloudSnow className="w-5 h-5" />;
    if (condition.includes('cloud')) return <Cloud className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass p-4 max-w-md mx-auto mt-4"
    >
      <h3 className="text-white font-medium mb-3">5-Day Forecast</h3>
      <div className="space-y-2">
        {dailyForecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between text-white/90">
            <span className="text-sm">
              {new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}
            </span>
            <div className="flex items-center gap-2">
              {getWeatherIcon(day.weather[0].main.toLowerCase())}
              <span className="text-sm">{Math.round(day.main.temp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastCard;