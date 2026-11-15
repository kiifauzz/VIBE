import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mood } from '../types';
import { MOOD_OPTIONS } from '../data/songsData';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeMood: Mood;
  setActiveMood: (mood: Mood) => void;
  ambientGradient: string;
  accentColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vibe_theme_mode');
    return saved !== null ? saved === 'dark' : true;
  });

  const [activeMood, setActiveMood] = useState<Mood>('Santai');

  useEffect(() => {
    localStorage.setItem('vibe_theme_mode', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const currentMoodObj = MOOD_OPTIONS.find(m => m.id === activeMood) || MOOD_OPTIONS[0];

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        activeMood,
        setActiveMood,
        ambientGradient: currentMoodObj.gradient,
        accentColor: currentMoodObj.accentColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
