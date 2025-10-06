import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-4 max-w-md mx-auto mb-6"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            disabled={loading}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onLocationSearch}
          disabled={loading}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <MapPin className="w-4 h-4" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;