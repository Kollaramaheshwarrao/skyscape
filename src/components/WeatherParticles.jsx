import { useEffect, useState } from 'react';

const WeatherParticles = ({ condition }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!condition) return;

    const createParticles = () => {
      const newParticles = [];
      const count = condition.includes('rain') ? 50 : condition.includes('snow') ? 30 : 0;
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 2,
          animationDuration: condition.includes('rain') ? 1 + Math.random() : 3 + Math.random() * 2
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();
  }, [condition]);

  if (!condition || (!condition.includes('rain') && !condition.includes('snow'))) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`weather-particle ${condition.includes('rain') ? 'rain-drop' : 'snow-flake'}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`
          }}
        />
      ))}
    </div>
  );
};

export default WeatherParticles;