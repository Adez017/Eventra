import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 group"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Sun 
          className="w-5 h-5 text-yellow-500 transform group-hover:scale-110 transition-transform duration-300" 
        />
      ) : (
        <Moon 
          className="w-5 h-5 text-indigo-600 transform group-hover:scale-110 transition-transform duration-300" 
        />
      )}
    </button>
  );
};

export default ThemeToggle;