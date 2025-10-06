import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Map } from 'lucide-react';

const GlobeToggle = ({ showGlobe, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="glass p-3 rounded-full text-white hover:bg-white/20 transition-colors"
    >
      {showGlobe ? <Map className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
    </motion.button>
  );
};

export default GlobeToggle;