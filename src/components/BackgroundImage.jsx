import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLocationImage } from '../utils/weatherApi';

const BackgroundImage = ({ location, weather }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = () => {
      setLoading(true);
      try {
        const url = getLocationImage(location);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading background image:', error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchImage();
    }
  }, [location]);

  if (loading || !imageUrl) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-0"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
    </motion.div>
  );
};

export default BackgroundImage;