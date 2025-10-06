export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'dawn';
  if (hour >= 12 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
};

export const getWeatherMood = (temp, condition) => {
  if (temp > 30) return '🔥';
  if (temp > 20 && temp <= 30) return '🌤️';
  if (temp > 10 && temp <= 20) return '😊';
  if (temp > 0 && temp <= 10) return '❄️';
  return '🥶';
};

export const getWeatherGradient = (condition, timeOfDay) => {
  const gradients = {
    dawn: {
      clear: 'from-dawn-peach via-dawn-lavender to-pink-300',
      clouds: 'from-gray-300 via-dawn-peach to-dawn-lavender',
      rain: 'from-gray-400 via-blue-300 to-dawn-lavender',
      snow: 'from-gray-200 via-white to-dawn-lavender'
    },
    day: {
      clear: 'from-day-cerulean via-blue-400 to-day-warm',
      clouds: 'from-gray-400 via-blue-300 to-blue-500',
      rain: 'from-gray-600 via-blue-500 to-blue-700',
      snow: 'from-gray-300 via-blue-200 to-white'
    },
    evening: {
      clear: 'from-evening-amber via-orange-400 to-evening-violet',
      clouds: 'from-gray-500 via-evening-amber to-evening-violet',
      rain: 'from-gray-700 via-purple-500 to-evening-violet',
      snow: 'from-gray-400 via-purple-200 to-evening-violet'
    },
    night: {
      clear: 'from-night-navy via-purple-900 to-indigo-900',
      clouds: 'from-gray-800 via-night-navy to-purple-900',
      rain: 'from-gray-900 via-blue-900 to-night-navy',
      snow: 'from-gray-700 via-blue-800 to-night-navy'
    }
  };

  const weatherType = condition.includes('rain') ? 'rain' :
                     condition.includes('snow') ? 'snow' :
                     condition.includes('cloud') ? 'clouds' : 'clear';

  return gradients[timeOfDay][weatherType] || gradients[timeOfDay].clear;
};

export const getComfortLevel = (temp, humidity, windSpeed) => {
  let score = 50;
  
  // Temperature comfort (20-25°C is ideal)
  if (temp >= 20 && temp <= 25) score += 20;
  else if (temp >= 15 && temp <= 30) score += 10;
  else score -= Math.abs(temp - 22.5) * 2;
  
  // Humidity comfort (40-60% is ideal)
  if (humidity >= 40 && humidity <= 60) score += 15;
  else score -= Math.abs(humidity - 50) * 0.3;
  
  // Wind comfort (light breeze is nice)
  if (windSpeed >= 2 && windSpeed <= 8) score += 10;
  else if (windSpeed > 15) score -= windSpeed;
  
  return Math.max(0, Math.min(100, score));
};